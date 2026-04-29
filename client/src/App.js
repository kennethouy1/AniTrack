import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import AnimeDetail from './pages/AnimeDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    </Router>
  )
}

export default App