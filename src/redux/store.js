import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./features/searchSlice"
import collectionReducer from "./features/CollectionSlice"

/**
 * THE REDUX STORE EXPLAINED:
 * The "store" is the single source of truth for your entire application's state.
 * Imagine it as a giant object that holds all the data for your app.
 */
export const store = configureStore({
    // The "reducer" object tells the store which slices to handle.
    // Each key (e.g., "search") becomes a piece of the global state.
    reducer: {
        search: searchReducer, // Connecting our search slice to the store
        collection: collectionReducer // Connecting our collection slice
    }
})

