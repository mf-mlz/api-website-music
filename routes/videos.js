const express = require('express');
const router = express.Router();

const videosController = require('../controllers/videosController');

router.get('/:number', videosController.getLatestFacebookVideos); 

module.exports = router;

