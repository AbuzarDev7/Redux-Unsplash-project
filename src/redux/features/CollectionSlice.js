import { createSlice } from "@reduxjs/toolkit";

/**
 * INITIAL STATE:
 * We try to load the collection from localStorage.
 * If nothing is found, we start with an empty array.
 */
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("collection");
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load collection from localStorage", err);
        return [];
    }
};

const initialState = {
    items: loadFromLocalStorage(),
};

export const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        /**
         * Adds an item to the collection if it's not already there.
         * Saves the updated collection to localStorage.
         */
        addToCollection: (state, action) => {
            const item = action.payload;
            const exists = state.items.find((i) => i.id === item.id);
            
            if (!exists) {
                state.items.push(item);
                localStorage.setItem("collection", JSON.stringify(state.items));
            }
        },
        /**
         * Removes an item from the collection based on its ID.
         * Updates localStorage.
         */
        removeFromCollection: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((i) => i.id !== itemId);
            localStorage.setItem("collection", JSON.stringify(state.items));
        },
    },
});

export const { addToCollection, removeFromCollection } = collectionSlice.actions;

export default collectionSlice.reducer; 