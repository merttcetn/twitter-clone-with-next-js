import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/app/types";

interface PostsState {
    posts: Post[];
    likedPosts: string[]; // Array of post IDs that are liked
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    likedPosts: [],
    loading: false,
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            // Add new post to the beginning of the array
            state.posts.unshift(action.payload);
        },
        setPosts: (state, action: PayloadAction<Post[]>) => {
            // Merge new posts with existing ones, avoiding duplicates
            const existingIds = new Set(state.posts.map((post) => post.id));
            const newPosts = action.payload.filter(
                (post) => !existingIds.has(post.id)
            );
            state.posts = [...state.posts, ...newPosts];
        },
        resetPosts: (state) => {
            state.posts = [];
        },
        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        },
        likePost: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            if (!state.likedPosts.includes(postId)) {
                state.likedPosts.push(postId);
                const post = state.posts.find((p) => p.id === postId);
                if (post) {
                    post.likes += 1;
                }
            }
        },
        unlikePost: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            state.likedPosts = state.likedPosts.filter((id) => id !== postId);
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.likes = Math.max(0, post.likes - 1);
            }
        },
    },
});

export const {
    addPost,
    setPosts,
    resetPosts,
    deletePost,
    likePost,
    unlikePost,
} = postsSlice.actions;
export default postsSlice.reducer;
