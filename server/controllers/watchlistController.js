const supabase = require('../config/supabaseClient')

const getWatchlist = async (req, res) => {
  const { user_id } = req.params
  try {
    const { data, error } = await supabase
      .from('anime_list')
      .select('*')
      .eq('user_id', user_id)
    if (error) return res.status(400).json({ error: error.message })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

const addToWatchlist = async (req, res) => {
  const { user_id, anime_id, status } = req.body
  try {
    const { data, error } = await supabase
      .from('anime_list')
      .insert([{ user_id, anime_id, status }])
    if (error) return res.status(400).json({ error: error.message })
    res.status(201).json({ message: 'Anime added to watchlist' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

const updateWatchlist = async (req, res) => {
  const { id } = req.params
  const { status, episodes_watched, rating, notes } = req.body
  try {
    const { data, error } = await supabase
      .from('anime_list')
      .update({ status, episodes_watched, rating, notes })
      .eq('id', id)
    if (error) return res.status(400).json({ error: error.message })
    res.status(200).json({ message: 'Watchlist updated' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

const deleteFromWatchlist = async (req, res) => {
  const { id } = req.params
  try {
    const { data, error } = await supabase
      .from('anime_list')
      .delete()
      .eq('id', id)
    if (error) return res.status(400).json({ error: error.message })
    res.status(200).json({ message: 'Anime removed from watchlist' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getWatchlist, addToWatchlist, updateWatchlist, deleteFromWatchlist }