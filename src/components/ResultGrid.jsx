import React from 'react';
import { useSelector } from 'react-redux';
import ResultCard from './ResultCard';

/**
 * RESULT GRID COMPONENT:
 * This component displays the list of photos, videos, or gifs.
 * It automatically updates whenever the Redux store changes.
 */
const ResultGrid = () => {
  // We grab everything we need from the "search" slice in Redux
  const { results, loading, error, activetab, query } = useSelector((state) => state.search);

  // 1. If it's loading, show a simple message
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 2. If there's an error, show it to the user
  if (error) {
    return (
      <div className="text-center py-20 text-red-400">
        <p className="text-xl font-semibold">Oops! {error}</p>
      </div>
    );
  }

  // 3. If there are no results yet (and we have searched)
  if (results.length === 0 && query) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-xl">No {activetab} found for "{query}"</p>
      </div>
    );
  }

  // 4. THE GRID: Map over the results and create a ResultCard for each item
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
      {results.map((item, index) => (
        <ResultCard key={item.id || index} item={item} type={activetab} />
      ))}
    </div>
  );
};

export default ResultGrid;
