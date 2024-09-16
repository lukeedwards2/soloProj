const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/active', async (req, res) => {
  const userId = req.user.id;
  const result = await pool.query('SELECT * FROM "bets" WHERE "user_id" = $1 AND "status" = $2', [userId, 'active']);
  res.json(result.rows);
});


router.post('/', async (req, res) => {
  const { sportsbook, sport, player, propType, propNumber, amount } = req.body;
  const userId = req.user.id;
  await pool.query(
    'INSERT INTO "bets" ("user_id", "sportsbook", "sport", "player", "prop_type", "prop_number", "amount", "status") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [userId, sportsbook, sport, player, propType, propNumber, amount, 'active']
  );
  res.sendStatus(201);
});


router.put('/:id', async (req, res) => {
  const { sportsbook, sport, player, propType, propNumber, amount } = req.body;
  const betId = req.params.id;
  await pool.query(
    'UPDATE "bets" SET "sportsbook" = $1, "sport" = $2, "player" = $3, "prop_type" = $4, "prop_number" = $5, "amount" = $6 WHERE "id" = $7',
    [sportsbook, sport, player, propType, propNumber, amount, betId]
  );
  res.sendStatus(200);
});


router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const betId = req.params.id;
  await pool.query('UPDATE "bets" SET "status" = $1 WHERE "id" = $2', [status, betId]);
  res.sendStatus(200);
});


router.get('/history', async (req, res) => {
  const userId = req.user.id;
  const result = await pool.query('SELECT * FROM "bets" WHERE "user_id" = $1 AND "status" != $2', [userId, 'active']);
  res.json(result.rows);
});

module.exports = router;



