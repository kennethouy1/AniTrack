import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Landing.css'

function Landing() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user_id', res.data.user.id)
        navigate('/dashboard')
      } else {
        await axios.post('http://localhost:5000/api/auth/signup', { email, username, password })
        setIsLogin(true)
        setError('Account created! Please log in.')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="landing-container">
      <h1 className="landing-title">AniTrack</h1>
      <p className="landing-subtitle">Track your anime journey</p>
      <div className="landing-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="landing-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input className="landing-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {!isLogin && (
            <input className="landing-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          )}
          <input className="landing-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="landing-button" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p className="landing-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span className="landing-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Landing