import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

function Dashboard() {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    status: '',
    episodes_watched: 0,
    rating: 0,
    notes: ''
  })
  const navigate = useNavigate()
  const user_id = localStorage.getItem('user_id')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }
    fetchWatchlist()
  }, [])

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/watchlist/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setWatchlist(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this anime from your watchlist?')) return
    try {
      await axios.delete(`http://localhost:5000/api/watchlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setWatchlist(watchlist.filter(item => item.id !== id))
    } catch (err) {
      alert('Failed to delete')
    }
  }

  const handleEditClick = (item) => {
    setEditingId(item.id)
    setEditForm({
      status: item.status,
      episodes_watched: item.episodes_watched,
      rating: item.rating,
      notes: item.notes || ''
    })
  }

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/watchlist/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEditingId(null)
      fetchWatchlist()
    } catch (err) {
      alert('Failed to update')
    }
  }

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
          <div key={item.id} className="dashboard-card">
            {editingId === item.id ? (
              <div className="edit-form">
                <label className="edit-label">Status</label>
                <select
                  className="edit-select"
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  <option value="watching">Watching</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                  <option value="plan_to_watch">Plan to Watch</option>
                </select>
                <label className="edit-label">Episodes Watched</label>
                <input
                  className="edit-input"
                  type="number"
                  value={editForm.episodes_watched}
                  onChange={(e) => setEditForm({ ...editForm, episodes_watched: parseInt(e.target.value) })}
                />
                <label className="edit-label">Rating (0-10)</label>
                <input
                  className="edit-input"
                  type="number"
                  min="0"
                  max="10"
                  value={editForm.rating}
                  onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                />
                <label className="edit-label">Notes</label>
                <textarea
                  className="edit-textarea"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={() => handleUpdate(item.id)}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p className="card-anime-id" onClick={() => navigate(`/anime/${item.anime_id}`)}>MAL ID: {item.anime_id}</p>
                <span className={`card-status ${item.status}`}>{item.status}</span>
                <p className="card-episodes">Episodes watched: {item.episodes_watched}</p>
                {item.rating > 0 && <p className="card-rating">⭐ {item.rating}/10</p>}
                {item.notes && <p className="card-notes">{item.notes}</p>}
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard