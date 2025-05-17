const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router();


router.get('/register', (req, res) => {
  res.render('register'); // render the registration page
});
router.post("/register", register);
router.post("/login", login);

module.exports = router;
