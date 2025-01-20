"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import { Post as PostType } from "../types/index";

interface ProfileScreenProps {
    onMenuClick: () => void;
    username?: string;
}

interface UserProfile {
    name: string;
    username: string;
}

// Kendi profilimin bilgileri
export const MY_PROFILE = {
    name: "Mert Çetin",
    username: "mert_cetin",
    bio: "Software Engineer",
} as UserProfile & { bio: string };

export default function ProfileScreen({
    onMenuClick,
    username,
}: ProfileScreenProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userPosts, setUserPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedPost, setSelectedPost] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | undefined>(undefined);
    const POSTS_PER_PAGE = 10;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Eğer username belirtilmemişse, kendi profilimi göster
                const targetUsername = username || MY_PROFILE.username;

                if (!username) {
                    setUserProfile(MY_PROFILE);
                }

                const postsResponse = await fetch(
                    `http://localhost:3001/posts?username=${targetUsername}&_sort=timestamp&_order=desc&_page=${page}&_limit=${POSTS_PER_PAGE}`
                );

                if (!postsResponse.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const totalCount = postsResponse.headers.get("X-Total-Count");
                const posts: PostType[] = await postsResponse.json();

                // İlk sayfada ve henüz profil bilgisi yoksa, ilk post'tan profil bilgilerini al
                if (page === 1 && username && posts.length > 0) {
                    setUserProfile({
                        name: posts[0].name,
                        username: posts[0].username,
                    });
                }

                setUserPosts((prevPosts) => {
                    if (page === 1) return posts;

                    // Duplicate kontrolü
                    const existingIds = new Set(
                        prevPosts.map((post) => post.id)
                    );
                    const newPosts = posts.filter(
                        (post) => !existingIds.has(post.id)
                    );
                    return [...prevPosts, ...newPosts];
                });

                setHasMore(
                    totalCount
                        ? page * POSTS_PER_PAGE < parseInt(totalCount)
                        : posts.length === POSTS_PER_PAGE
                );
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load profile data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username, page]);

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

        if (node && observer.current) {
            observer.current.observe(node);
        }
    };

    const handlePostClick = (postId: string) => {
        setSelectedPost(selectedPost === postId ? null : postId);
    };

    if (loading && page === 1) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF7452]" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-100">
                <Header
                    onMenuClick={onMenuClick}
                    title={userProfile?.username || "Profile"}
                />
            </div>

            {/* Profile Banner */}
            <div className="h-48 bg-[#FF7452]" />

            {/* Profile Info */}
            <div className="px-4 pb-4 relative">
                <div className="absolute -top-16 left-4 w-32 h-32 rounded-full border-4 border-white bg-gray-200" />
                <div className="pt-20">
                    <h1 className="text-xl font-bold">{userProfile?.name}</h1>
                    <p className="text-gray-500">@{userProfile?.username}</p>
                </div>
            </div>

            {/* User Posts */}
            <div className="border-t border-gray-100">
                {userPosts.map((post, index) => (
                    <div
                        key={post.id}
                        ref={
                            index === userPosts.length - 1
                                ? lastPostElementRef
                                : null
                        }
                    >
                        <Post
                            {...post}
                            isSelected={selectedPost === post.id}
                            onPostClick={handlePostClick}
                            comments={post.comments || []}
                            tags={post.tags || []}
                        />
                    </div>
                ))}

                {/* Loading Spinner - Sonraki sayfalar için */}
                {loading && page > 1 && (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF7452]" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-8 text-red-500">{error}</div>
                )}

                {/* Empty State */}
                {!loading && !error && userPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No posts yet 😕
                    </div>
                )}
            </div>
        </div>
    );
}
