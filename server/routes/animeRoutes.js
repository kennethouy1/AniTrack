const express = require('express')
const router = express.Router()
const { searchAnime, getAnimeById } = require('../controllers/animeController')

router.get('/search', searchAnime)
router.get('/:id', getAnimeById)

module.exports = router