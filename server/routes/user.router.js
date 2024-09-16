const express = require('express');
const pool = require('../modules/pool');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();


router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error registering user', error);
    res.sendStatus(500);
  }
});


router.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

