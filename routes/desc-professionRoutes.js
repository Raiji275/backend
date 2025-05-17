const express = require('express');
const router = express.Router();
const descProfessionController = require('../controller/professionController');

router.get('/', descProfessionController.getAllProfessions); // GET /api/v1/desc-profession
router.get('/:type', descProfessionController.getProfessionsByType); // GET /api/v1/desc-profession/MB_3

module.exports = router;