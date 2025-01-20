"use client";
import Header from "../components/Header";
import Post from "../components/Post";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface BookmarksScreenProps {
    onMenuClick: () => void;
}

export default function BookmarksScreen({ onMenuClick }: BookmarksScreenProps) {
    const bookmarkedPosts = useSelector((state: RootState) => {
        console.log("Current bookmarks state:", state.bookmarks); // Debug için
        return state.bookmarks.items;
    });
    const [selectedPost, setSelectedPost] = useState<string | null>(null);

    const handlePostClick = (postId: string) => {
        setSelectedPost(selectedPost === postId ? null : postId);
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-100">
                <Header onMenuClick={onMenuClick} title="Bookmarks" />
            </div>

            <div className="border-t border-gray-100">
                {bookmarkedPosts.map((post) => (
                    <Post
                        key={post.id}
                        {...post}
                        content={post.content || ""}
                        isSelected={selectedPost === post.id}
                        onPostClick={() => handlePostClick(post.id)}
                    />
                ))}

                {bookmarkedPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No bookmarks yet 🔖
                    </div>
                )}
            </div>
        </div>
    );
}
