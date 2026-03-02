import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'
import CollectionPage from './pages/CollectionPage'

const Home = () => {
  return (
    <div className='flex flex-col items-center w-full px-4'>
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-blue-500 tracking-tight">
          Unsplash Explorer
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
          Discover photos, videos, and gifs from around the world with lightning fast search.
        </p>
      </div>

      <SearchBar />
      <Tabs />

      <div className="w-full mt-10">
        <ResultGrid />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <div className='min-h-screen w-full bg-gray-950 text-white flex flex-col items-center pt-6'>

        <nav className="w-full max-w-6xl px-4 flex justify-end mb-6">
          <Link 
            to="/collection" 
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 shadow-md"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            My Collection
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