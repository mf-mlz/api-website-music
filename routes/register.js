const express = require('express');
const router = express.Router();
const validationRegister = require('../middelwares/validator');

const registerController = require('../controllers/registerController');

router.post('/', validationRegister, registerController.registerContact); 

module.exports = router;