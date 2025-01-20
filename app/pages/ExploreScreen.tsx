"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import { Post as PostType } from "../types";

interface ExploreScreenProps {
    onMenuClick: () => void;
}

export default function ExploreScreen({ onMenuClick }: ExploreScreenProps) {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [selectedPost, setSelectedPost] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | undefined>(undefined);
    const POSTS_PER_PAGE = 10;

    // Tüm tagleri getir
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch("http://localhost:3001/posts");
                const data: PostType[] = await response.json();
                const tags = [
                    ...new Set(data.flatMap((post) => post.tags)),
                ].sort();
                setAvailableTags(tags);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    // Filtrelenmiş postları getir
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Temel URL
                const url = `http://localhost:3001/posts?_sort=timestamp&_order=desc&_page=${page}&_limit=${POSTS_PER_PAGE}`;

                // Tag filtresi varsa, tüm tagleri içeren postları getir
                if (selectedTags.length > 0) {
                    const response = await fetch("http://localhost:3001/posts");
                    const allPosts: PostType[] = await response.json();

                    // Seçilen tüm tag'leri içeren postları filtrele
                    const filteredPosts = allPosts.filter((post) =>
                        selectedTags.every((tag) => post.tags.includes(tag))
                    );

                    // Sayfalama için slice
                    const start = (page - 1) * POSTS_PER_PAGE;
                    const end = start + POSTS_PER_PAGE;
                    const paginatedPosts = filteredPosts.slice(start, end);

                    setPosts((prevPosts) => {
                        if (page === 1) return paginatedPosts;
                        return [...prevPosts, ...paginatedPosts];
                    });

                    setHasMore(end < filteredPosts.length);
                    setLoading(false);
                    return;
                }

                // Tag filtresi yoksa normal fetch
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch posts");

                const totalCount = response.headers.get("X-Total-Count");
                const data: PostType[] = await response.json();

                setPosts((prevPosts) => {
                    if (page === 1) return data;
                    const existingIds = new Set(
                        prevPosts.map((post) => post.id)
                    );
                    const newPosts = data.filter(
                        (post) => !existingIds.has(post.id)
                    );
                    return [...prevPosts, ...newPosts];
                });

                setHasMore(
                    totalCount
                        ? page * POSTS_PER_PAGE < parseInt(totalCount)
                        : data.length === POSTS_PER_PAGE
                );
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, selectedTags]);

    // Intersection Observer
    useEffect(() => {
        const currentObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        observer.current = currentObserver;

        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [hasMore, loading]);

    const lastPostElementRef = (node: HTMLElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        if (node && observer.current) observer.current.observe(node);
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags((prev) => {
            const newTags = prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag];
            setPage(1); // Tag değiştiğinde sayfayı resetle
            setPosts([]); // Postları temizle
            return newTags;
        });
    };

    const handlePostClick = (postId: string) => {
        setSelectedPost(selectedPost === postId ? null : postId);
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-100">
                <Header onMenuClick={onMenuClick} title="Explore" />

                {/* Tags */}
                <div className="px-4 py-4">
                    {/* Tag'ler için yatay scroll container */}
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-2 p-2">
                            {availableTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`
                                        flex-none
                                        px-4 py-2
                                        rounded-full 
                                        text-sm
                                        font-medium 
                                        whitespace-nowrap
                                        transition-all
                                        ${
                                            selectedTags.includes(tag)
                                                ? "bg-[#FF7452] text-white ring-2 ring-[#FF7452] ring-offset-2"
                                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    {tag.replace("#", "")}
                                    {selectedTags.includes(tag) && (
                                        <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                            ✕
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Seçili tag'leri göster */}
                    {selectedTags.length > 0 && (
                        <div className="mt-4">
                            <span className="text-sm text-gray-500">
                                Filtered by {selectedTags.length} tag
                                {selectedTags.length > 1 ? "s" : ""}
                            </span>
                            <button
                                onClick={() => {
                                    setSelectedTags([]);
                                    setPage(1);
                                    setPosts([]);
                                }}
                                className="text-sm text-[#FF7452] hover:underline ml-2"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Posts */}
            <div className="border-t border-gray-100">
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        ref={
                            index === posts.length - 1
                                ? lastPostElementRef
                                : null
                        }
                    >
                        <Post
                            {...post}
                            content={post.content || ""}
                            isSelected={selectedPost === post.id}
                            onPostClick={() => handlePostClick(post.id)}
                            comments={[]}
                            tags={post.tags || []}
                        />
                    </div>
                ))}

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF7452]" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-8 text-red-500">{error}</div>
                )}

                {/* Empty State */}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        {selectedTags.length > 0
                            ? "No posts found with selected tags... 🏷️"
                            : "No posts available... 😕"}
                    </div>
                )}
            </div>
        </div>
    );
}
