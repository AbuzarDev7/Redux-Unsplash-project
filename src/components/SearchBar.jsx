import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setLoading, setError, setResults, clearResults } from '../redux/features/searchSlice';
import { fetchData, fetchVideos, fetchGifs } from '../api/mediaApi';

/** 
 * SEARCH BAR COMPONENT:
 * This is where the user types what they want to find.
 * It uses Redux to store the results so other parts of the app can see them.
 */
const SearchBar = () => {
  // Local state to keep track of what the user is typing in the input box
  const [inputValue, setInputValue] = useState('');
  
  // useDispatch is a hook that lets us send "actions" to the Redux store
  const dispatch = useDispatch();
  
  // useSelector is a hook that lets us read data from the Redux store
  const { activetab } = useSelector((state) => state.search);

  // This function runs when the user clicks the "Search" button
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    
    // If the input is empty, don't do anything
    if (!inputValue.trim()) return;

    // 1. Tell Redux what the user searched for
    dispatch(setQuery(inputValue));
    
    // 2. Tell Redux to show a loading spinner
    dispatch(setLoading());

    try {
      let data;
      // 3. Fetch data based on which tab (photos, videos, or gifs) is active
      if (activetab === 'photos') {
        data = await fetchData(inputValue);
      } else if (activetab === 'videos') {
        data = await fetchVideos(inputValue);
      } else {
        data = await fetchGifs(inputValue);
      }
      
      // 4. Send the results to Redux so they can be displayed
      dispatch(setResults(data));
      
    } catch (err) {
      // 5. If something goes wrong, tell Redux about the error
      dispatch(setError(err.message || 'Something went wrong while fetching data'));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative group">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Input Box */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Search ${activetab}...`}
          className="block w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-2xl"
        />
        
        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-3 top-2.5 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all active:scale-95 shadow-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
