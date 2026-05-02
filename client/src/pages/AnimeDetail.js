import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AnimeDetail.css'

function AnimeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/anime/${id}`)
        setAnime(res.data.data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchAnime()
  }, [id])

  const handleAdd = async () => {
    const user_id = localStorage.getItem('user_id')
    try {
      await axios.post('http://localhost:5000/api/watchlist', {
        user_id,
        anime_id: anime.mal_id,
        status: 'watching'
      })
      alert('Added to watchlist!')
    } catch (err) {
      alert('Failed to add to watchlist')
    }
  }

  if (loading) return <div className="detail-loading">Loading...</div>
  if (!anime) return <div className="detail-loading">Anime not found</div>

  return (
    <div className="detail-container">
      <button className="detail-back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-hero">
        <img src={anime.images.jpg.large_image_url} alt={anime.title} className="detail-image" />
        <div className="detail-info">
          <h1 className="detail-title">{anime.title}</h1>
          <p className="detail-meta">⭐ {anime.score} • {anime.episodes} episodes • {anime.status}</p>
          <p className="detail-meta">📅 {anime.aired?.string}</p>
          <p className="detail-meta">🎬 {anime.studios?.map(s => s.name).join(', ')}</p>
          <p className="detail-meta">🏷️ {anime.genres?.map(g => g.name).join(', ')}</p>
          <button className="detail-add-btn" onClick={handleAdd}>+ Add to Watchlist</button>
        </div>
      </div>
      <div className="detail-section">
        <h2 className="detail-section-title">Synopsis</h2>
        <p className="detail-synopsis">{anime.synopsis}</p>
      </div>
      {anime.trailer?.embed_url && (
        <div className="detail-section">
          <h2 className="detail-section-title">Trailer</h2>
          <iframe
            src={anime.trailer.embed_url}
            title="Trailer"
            className="detail-trailer"
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}

export default AnimeDetail