import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Search.css'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:5000/api/anime/search?q=${query}`)
      setResults(res.data.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleAdd = async (anime_id) => {
  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('token')
  try {
    await axios.post('http://localhost:5000/api/watchlist', {
      user_id,
      anime_id,
      status: 'watching'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Added to watchlist!')
  } catch (err) {
    alert(err.response?.data?.error || 'Failed to add to watchlist')
  }
}

  return (
    <div className="search-container">
      <div className="search-header">
        <h1 className="search-title">Search Anime</h1>
        <button className="search-back-btn" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search for an anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn" type="submit">Search</button>
      </form>
      {loading && <p className="search-loading">Searching...</p>}
      <div className="search-results">
        {results.map((anime) => (
          <div key={anime.mal_id} className="search-card">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="search-card-image" />
            <div className="search-card-info">
              <h3 className="search-card-title">{anime.title}</h3>
              <p className="search-card-meta">{anime.episodes} episodes • {anime.status}</p>
              <p className="search-card-synopsis">{anime.synopsis?.slice(0, 100)}...</p>
              <div className="search-card-buttons">
                <button className="search-add-btn" onClick={() => handleAdd(anime.mal_id)}>+ Add to Watchlist</button>
                <button className="search-detail-btn" onClick={() => navigate(`/anime/${anime.mal_id}`)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search