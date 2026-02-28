import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'
import CollectionPage from './pages/CollectionPage'

const Home = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className="text-center mb-8">
        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-default">
          Unsplash Explorer
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
            Discover photos, videos, and gifs from around the world with lightning fast search.
        </p>
      </div>
      
      <SearchBar />
      <Tabs />
      
      <div className="w-full mt-8">
        <ResultGrid />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <div className='min-h-screen w-full bg-gray-950 text-white flex flex-col items-center pt-8'>
        {/* Navigation Bar */}
        <nav className="w-full max-w-6xl px-4 flex justify-end mb-4">
          <Link 
            to="/collection" 
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl transition-all hover:scale-105 active:scale-95 group shadow-lg"
          >
            <span className="text-sm font-bold">My Collection</span>
            <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App