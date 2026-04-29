const axios = require('axios')

const JIKAN_BASE = 'https://api.jikan.moe/v4'

const searchAnime = async (req, res) => {
  const { q } = req.query
  try {
    const response = await axios.get(`${JIKAN_BASE}/anime?q=${q}&limit=10`)
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch anime' })
  }
}

const getAnimeById = async (req, res) => {
  const { id } = req.params
  try {
    const response = await axios.get(`${JIKAN_BASE}/anime/${id}`)
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch anime details' })
  }
}

module.exports = { searchAnime, getAnimeById }