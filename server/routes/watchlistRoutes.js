const express = require('express')
const router = express.Router()
const { getWatchlist, addToWatchlist, updateWatchlist, deleteFromWatchlist } = require('../controllers/watchlistController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:user_id', protect, getWatchlist)
router.post('/', protect, addToWatchlist)
router.put('/:id', protect, updateWatchlist)
router.delete('/:id', protect, deleteFromWatchlist)

module.exports = router