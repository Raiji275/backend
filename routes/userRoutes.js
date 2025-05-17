const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const router = express.Router();


router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
console.log('Authorization header:', req.headers.authorization);
  res.render('admin');
});


module.exports = router; 