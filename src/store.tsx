import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './features/category/categorySlice'

// Create Redux store with category reducer
export const store = configureStore({
    reducer: {
        category: categoryReducer
    }
});

// Define RootSate and AppDispatch types for use in components
export type RootSate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;