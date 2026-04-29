import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
    try {
      await axios.post('http://localhost:5000/api/watchlist', {
        user_id,
        anime_id,
        status: 'watching'
      })
      alert('Added to watchlist!')
    } catch (err) {
      alert('Failed to add to watchlist')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Search Anime</h1>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Search for an anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button style={styles.button} type="submit">Search</button>
      </form>
      {loading && <p style={styles.loading}>Searching...</p>}
      <div style={styles.results}>
        {results.map((anime) => (
          <div key={anime.mal_id} style={styles.card}>
            <img src={anime.images.jpg.image_url} alt={anime.title} style={styles.image} />
            <div style={styles.info}>
              <h3 style={styles.animTitle}>{anime.title}</h3>
              <p style={styles.meta}>{anime.episodes} episodes • {anime.status}</p>
              <p style={styles.synopsis}>{anime.synopsis?.slice(0, 100)}...</p>
              <div style={styles.cardButtons}>
                <button style={styles.addBtn} onClick={() => handleAdd(anime.mal_id)}>+ Add to Watchlist</button>
                <button style={styles.detailBtn} onClick={() => navigate(`/anime/${anime.mal_id}`)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f0f', color: '#fff', padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { color: '#e63946', margin: 0 },
  backBtn: { backgroundColor: '#333', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  form: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
  input: { flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: '#fff', fontSize: '1rem' },
  button: { padding: '10px 20px', backgroundColor: '#e63946', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  loading: { color: '#aaa', textAlign: 'center' },
  results: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  card: { display: 'flex', gap: '1rem', backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1rem' },
  image: { width: '80px', height: '110px', objectFit: 'cover', borderRadius: '6px' },
  info: { flex: 1 },
  animTitle: { margin: '0 0 4px', color: '#fff' },
  meta: { color: '#aaa', fontSize: '0.85rem', margin: '0 0 8px' },
  synopsis: { color: '#ccc', fontSize: '0.85rem', margin: '0 0 8px' },
  cardButtons: { display: 'flex', gap: '0.5rem' },
  addBtn: { padding: '6px 12px', backgroundColor: '#e63946', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  detailBtn: { padding: '6px 12px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }
}

export default Search