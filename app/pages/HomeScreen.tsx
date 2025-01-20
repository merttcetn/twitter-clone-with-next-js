"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Post from "../components/Post";
import { Post as PostType } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addPost, setPosts, resetPosts } from "../store/slices/postsSlice";
import { addBookmark, removeBookmark } from "../store/slices/bookmarksSlice";

interface HomeScreenProps {
    onMenuClick: () => void;
}

export default function HomeScreen({ onMenuClick }: HomeScreenProps) {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const bookmarks = useSelector((state: RootState) => state.bookmarks.items);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | undefined>(undefined);
    const POSTS_PER_PAGE = 10;
    const [selectedPost, setSelectedPost] = useState<string | null>(null);
    const [newPostContent, setNewPostContent] = useState("");

    // Bunun yerine, searchQuery state'ini değiştirirken debounce uygulayalım
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); // Arama değiştiğinde sayfa 1'e dön
        }, 1500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Search effect
    useEffect(() => {
        if (searchQuery.trim() === "") {
            dispatch(resetPosts());
            setPage(1);
        }
    }, [searchQuery, dispatch]);

    // Fetch posts effect
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `http://localhost:3001/posts?_sort=timestamp&_order=desc&_page=${page}&_limit=${POSTS_PER_PAGE}${
                    searchQuery.trim() ? `&q=${searchQuery.trim()}` : ""
                }`;

                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch posts");

                const totalCount = response.headers.get("X-Total-Count");
                const data: PostType[] = await response.json();

                if (page === 1) {
                    dispatch(resetPosts());
                }
                dispatch(setPosts(data));

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
    }, [page, searchQuery, dispatch]);

    // Intersection Observer effect
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

    // Last post ref callback
    const lastPostElementRef = (node: HTMLElement | null) => {
        if (loading) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        if (node) {
            if (observer.current) {
                observer.current.observe(node);
            }
        }
    };

    const handlePostClick = (postId: string) => {
        setSelectedPost(postId);
    };

    // Yeni post ekleme örneği
    const handleCreatePost = async () => {
        if (!newPostContent.trim()) return;

        const newPost: PostType = {
            id: Date.now().toString(),
            content: newPostContent,
            username: "mert_cetin",
            name: "Mert Çetin",
            timestamp: new Date().toISOString(),
            likes: 0,
            reposts: 0,
            comments: [],
            tags: [],
        };

        try {
            // JSON server'a kaydet
            const response = await fetch("http://localhost:3001/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            const savedPost = await response.json();

            // Redux store'a kaydet
            dispatch(addPost(savedPost));
            setNewPostContent("");
        } catch (error) {
            console.error("Error creating post:", error);
            // Kullanıcıya hata gösterilebilir
            alert("Failed to create post. Please try again.");
        }
    };

    // Bookmark ekleme/çıkarma örneği
    const handleBookmarkToggle = (post: PostType) => {
        const isBookmarked = bookmarks.some((b) => b.id === post.id);
        if (isBookmarked) {
            dispatch(removeBookmark(post.id));
        } else {
            dispatch(addBookmark(post));
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Sticky header container */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-100">
                <Header onMenuClick={onMenuClick} title="Home" />
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>

            {/* Create Post */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="flex-1 bg-transparent text-lg placeholder-gray-500 focus:outline-none"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleCreatePost}
                        disabled={!newPostContent.trim()}
                        className={`px-5 py-2 font-medium rounded-full transition-colors
                            ${
                                newPostContent.trim()
                                    ? "bg-[#FF7452] hover:bg-[#FF5C33] text-white"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Post
                    </button>
                </div>
            </div>

            {/* Posts Feed */}
            <div>
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
                            onBookmarkToggle={() => handleBookmarkToggle(post)}
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

                {/* Empty State - sadece loading ve error yoksa göster */}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        {searchQuery
                            ? "No posts found matching your search... 🤔"
                            : "No posts available... 😕"}
                    </div>
                )}
            </div>
        </div>
    );
}
