const express = require('express');
const router = express.Router();

const surveyController = require('../controllers/surveyController');

router.get('/', surveyController.getSurveyData); 

module.exports = router;