const express = require('express')
const router = express.Router()
const { getWatchlist, addToWatchlist, updateWatchlist, deleteFromWatchlist } = require('../controllers/watchlistController')

router.get('/:user_id', getWatchlist)
router.post('/', addToWatchlist)
router.put('/:id', updateWatchlist)
router.delete('/:id', deleteFromWatchlist)

module.exports = router