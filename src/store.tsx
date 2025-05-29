import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './features/category/categorySlice'
export const store = configureStore({
    reducer: {
        category: categoryReducer
    }
});

export type RootSate = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;