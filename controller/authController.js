const bycrpt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bycrpt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: `User registered with username ${username}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: `User with username ${username} not found`,
      });
    }

    const isMatch = await bycrpt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = Jwt.sign(
      { userId: user._id, role: user.role},
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

  res.set("Authorization", `Bearer ${token}`);

  const elseltResp = await fetch('http://localhost:8000/api/v1/elselt/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const elseltData = await elseltResp.json();

  res.render('admin', { elseltList: elseltData });



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { register, login };