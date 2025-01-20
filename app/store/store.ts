import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import bookmarksReducer from "./slices/bookmarksSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        bookmarks: bookmarksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
