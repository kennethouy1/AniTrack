const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/anime', require('./routes/animeRoutes'))
app.use('/api/watchlist', require('./routes/watchlistRoutes'))

app.get('/', (req, res) => {
  res.json({ message: 'AniTrack API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

