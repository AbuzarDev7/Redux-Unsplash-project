import { createSlice } from "@reduxjs/toolkit";

/**
 * REDUX SLICE EXPLAINED:
 * A "slice" is a collection of Redux reducer logic and actions for a single feature 
 * in your app. Here, we manage everything related to "searching" (query, results, loading).
 */
const searchSlice = createSlice({
   name: "search", // The name used to identify this slice in the store
   
   // This is the starting data for our search feature
   initialState: {
      query: "",      // The text the user types in the search bar
      activetab: "photos", // Current category (photos, videos, or gifs)
      results: [],    // The list of items we get back from the API
      loading: false, // Tells us if we are currently waiting for data
      error: null     // Stores any error message if something goes wrong
   },

   // Reducers are functions that define HOW the state changes
   reducers: {
      // Updates the search query text
      setQuery(state, action) {
         state.query = action.payload // payload is the new query string
      },
      
      // Updates which tab is selected (photos, videos, or gifs)
      setActiveTab(state, action) {
         state.activetab = action.payload
      },
      
      // Saves the API results into our state and stops the loading spinner
      setResults(state, action) {
         state.results = action.payload
         state.loading = false
      },
      
      // Sets loading to true when we start a new search
      setLoading(state) {
         state.loading = true
         state.error = null // Clear previous errors
      },
      
      // Notifies the app of an error and stops loading
      setError(state, action) {
         state.error = action.payload
         state.loading = false
      },
      
      // Clears results (useful when resetting the app)
      clearResults(state){
         state.results = []
      }
   }
})

// EXPORTS:
// 1. Exporting "Actions" so we can "dispatch" them from our components (like SearchBar)
export const { 
   setQuery, 
   setResults, 
   setActiveTab, 
   setError, 
   setLoading, 
   clearResults 
} = searchSlice.actions

// 2. Exporting the "Reducer" to be added to our store.js
export default searchSlice.reducer
