const express = require('express');
const router = express.Router();

const imagesController = require('../controllers/imagesController');

router.get('/:number', imagesController.getLatestInstagramImages); 

module.exports = router;

