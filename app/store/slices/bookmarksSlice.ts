import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/app/types";

interface BookmarksState {
    items: Post[];
    bookmarkedPosts: string[]; // Kaydedilen post ID'leri
}

const initialState: BookmarksState = {
    items: [],
    bookmarkedPosts: [],
};

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        addBookmark: (state, action: PayloadAction<Post>) => {
            console.log("Adding bookmark:", action.payload); // Debug için
            if (!state.bookmarkedPosts.includes(action.payload.id)) {
                const newBookmark = {
                    ...action.payload,
                    comments: [], // Simplify comments to avoid immutability issues
                };
                state.items.push(newBookmark);
                state.bookmarkedPosts.push(action.payload.id);
            }
        },
        removeBookmark: (state, action: PayloadAction<string>) => {
            console.log("Removing bookmark:", action.payload); // Debug için
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            state.bookmarkedPosts = state.bookmarkedPosts.filter(
                (id) => id !== action.payload
            );
        },
    },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
