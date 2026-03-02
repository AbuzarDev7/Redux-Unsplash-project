import React from 'react';
import { useSelector } from 'react-redux';
import ResultCard from './ResultCard';

const ResultGrid = () => {
  const { results, loading, error, activetab, query } = useSelector((state) => state.search);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <h2 className="text-xl font-semibold text-red-400 mb-2">Oops!</h2>
        <p className="text-gray-400 text-sm max-w-md">{error}</p>
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-300">
          No {activetab} found
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Try searching something else for "{query}"
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {results.map((item, index) => (
          <ResultCard
            key={item.id || index}
            item={item}
            type={activetab}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultGrid;