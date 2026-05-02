import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

function Dashboard() {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user_id = localStorage.getItem('user_id')

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/watchlist/${user_id}`)
        setWatchlist(res.data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchWatchlist()
  }, [user_id])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">AniTrack</h1>
        <div className="dashboard-actions">
          <button className="search-btn" onClick={() => navigate('/search')}>Search Anime</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <h2 className="dashboard-subtitle">My Watchlist</h2>
      {loading && <p className="dashboard-loading">Loading...</p>}
      {!loading && watchlist.length === 0 && (
        <div className="dashboard-empty">
          <p>No anime in your watchlist yet!</p>
          <button className="search-btn" onClick={() => navigate('/search')}>Find Anime</button>
        </div>
      )}
      <div className="dashboard-grid">
        {watchlist.map((item) => (
          <div key={item.id} className="dashboard-card" onClick={() => navigate(`/anime/${item.anime_id}`)}>
            <p className="card-anime-id">MAL ID: {item.anime_id}</p>
            <span className={`card-status ${item.status}`}>{item.status}</span>
            <p className="card-episodes">Episodes watched: {item.episodes_watched}</p>
            {item.rating > 0 && <p className="card-rating">⭐ {item.rating}/10</p>}
            {item.notes && <p className="card-notes">{item.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard