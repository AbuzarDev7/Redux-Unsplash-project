import React from 'react';
import { useSelector } from 'react-redux';
import ResultCard from '../components/ResultCard';
import { Link } from 'react-router-dom';

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col items-center pt-20 px-4 pb-20">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link 
              to="/" 
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 mb-4 group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Search
            </Link>
            <h1 className="text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              My Collection
            </h1>
            <p className="text-gray-400 mt-2">
              Your saved photos, videos, and GIFs from across the web.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Total Items</p>
              <p className="text-2xl font-black">{collection.length}</p>
            </div>
            <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-500">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        {collection.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collection.map((item) => (
              <ResultCard 
                key={item.id} 
                item={item} 
                type={item.mediaType} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 text-gray-700">
              <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">No items saved yet</h2>
            <p className="text-gray-500 max-w-xs mb-8">
              Explore the library and click the save button on any card to build your personalized collection.
            </p>
            <Link 
              to="/" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20"
            >
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
