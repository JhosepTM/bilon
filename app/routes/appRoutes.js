const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

//Ruta para registar un SCO
router.post('/register/sco', appController.registerSCO);
router.post('/register/metadata', appController.registerMetadata);
router.get('/get_all/metadata', appController.getAllSCO);

module.exports = router;