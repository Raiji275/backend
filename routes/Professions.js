const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// assuming you have a Professions model defined
const Professions = require('../models/professions');

router.get('/', (req, res) => {
    // This endpoint returns all professions from the database
    Professions.find().then(professions => {
          res.set("Content-Type", "application/json");
      res.json(professions);
    });
  });

module.exports = router;
