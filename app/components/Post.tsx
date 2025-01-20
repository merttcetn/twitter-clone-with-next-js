// import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "@/app/store/slices/postsSlice";
import { addBookmark, removeBookmark } from "@/app/store/slices/bookmarksSlice";
import type { RootState } from "@/app/store/store";

interface CommentType {
    username: string;
    content: string;
    timestamp: string;
}

type PostProps = {
    id: string;
    name: string;
    username: string;
    content: string;
    timestamp: string;
    likes: number;
    reposts: number;
    comments: CommentType[];
    tags: string[];
    images?: string[];
    isSelected: boolean;
    onPostClick: (id: string) => void;
    onBookmarkToggle?: () => void;
};

export default function Post({
    id,
    name,
    username,
    content,
    timestamp,
    likes,
    reposts,
    comments,
    /* images, */
    tags = [],
    isSelected,
    onPostClick,
    onBookmarkToggle,
}: PostProps) {
    const dispatch = useDispatch();
    const isLiked = useSelector((state: RootState) =>
        state.posts.likedPosts.includes(id)
    );
    const isBookmarked = useSelector((state: RootState) =>
        state.bookmarks.bookmarkedPosts.includes(id)
    );

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLiked) {
            dispatch(unlikePost(id));
        } else {
            dispatch(likePost(id));
        }
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Use the provided onBookmarkToggle if available
        if (onBookmarkToggle) {
            onBookmarkToggle();
            return;
        }

        // Fallback to local bookmark handling
        if (isBookmarked) {
            dispatch(removeBookmark(id));
        } else {
            dispatch(
                addBookmark({
                    id,
                    name,
                    username,
                    content,
                    timestamp,
                    likes,
                    reposts,
                    comments: [],
                    tags: tags || [],
                })
            );
        }
    };

    return (
        <div
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onPostClick(id)}
        >
            <div className="flex space-x-3">
                <Link
                    href={`/profile/${username}`}
                    className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/profile/${username}`}
                            className="font-medium text-black hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {name}
                        </Link>
                        <Link
                            href={`/profile/${username}`}
                            className="text-gray-500 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            @{username}
                        </Link>
                        <span className="text-gray-500">·</span>
                        <p className="text-gray-500 text-sm">
                            {new Date(timestamp).toLocaleDateString()}
                        </p>
                    </div>
                    <p className="mt-2 text-[15px] leading-normal">{content}</p>
                    {/* {images && images.length > 0 && (
                        <div className="mt-3 relative rounded-2xl overflow-hidden">
                            <div className="aspect-[16/9] relative">
                                <Image
                                    src={images[0]}
                                    alt="Post image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )} */}
                    <div className="flex justify-between mt-4 max-w-md text-gray-500">
                        <button className="flex items-center space-x-2 group">
                            <div className="p-2 rounded-full group-hover:bg-[#FF7452]/10 group-hover:text-[#FF7452] transition-colors">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <span className="text-sm">
                                {comments?.length || 0}
                            </span>
                        </button>
                        <button className="flex items-center space-x-2 group">
                            <div className="p-2 rounded-full group-hover:bg-green-500/10 group-hover:text-green-500 transition-colors">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </div>
                            <span className="text-sm">{reposts}</span>
                        </button>
                        <button
                            onClick={handleLikeClick}
                            className={`flex items-center space-x-2 group ${
                                isLiked ? "text-red-500" : ""
                            }`}
                        >
                            <div
                                className={`p-2 rounded-full group-hover:bg-red-500/10 transition-colors ${
                                    isLiked
                                        ? "text-red-500"
                                        : "group-hover:text-red-500"
                                }`}
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill={isLiked ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <span
                                className={`text-sm ${
                                    isLiked ? "text-red-500" : ""
                                }`}
                            >
                                {likes}
                            </span>
                        </button>
                        <button
                            onClick={handleBookmarkClick}
                            className={`flex items-center space-x-2 group ${
                                isBookmarked ? "text-blue-500" : ""
                            }`}
                        >
                            <div className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                                <svg
                                    className="h-5 w-5"
                                    fill={
                                        isBookmarked ? "currentColor" : "none"
                                    }
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {isSelected && comments && comments.length > 0 && (
                <div className="mt-4 pl-13 border-t border-gray-100 pt-4 transition-all duration-300 ease-in-out opacity-0 animate-fade-in">
                    <h3 className="font-medium text-gray-600 mb-3">Comments</h3>
                    <div className="space-y-4">
                        {comments.map((comment, i) => (
                            <div
                                key={i}
                                className="flex space-x-3 transition-all duration-300 ease-in-out"
                                style={{
                                    animationDelay: `${i * 100}ms`,
                                    opacity: 0,
                                    animation:
                                        "fade-in 0.3s ease-in-out forwards",
                                }}
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <p className="font-medium">
                                            {comment.username || "Anonymous"}
                                        </p>
                                        <span className="text-gray-500 text-sm">
                                            {new Date(
                                                comment.timestamp || Date.now()
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-gray-700">
                                        {comment.content || ""}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
