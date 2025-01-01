const express = require('express');
const { fetchNews } = require('../controllers/articleController');

const router = express.Router();

router.get('/News', fetchNews);

module.exports = router;
