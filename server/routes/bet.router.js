const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get active bets for the current user
router.get('/active', async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT * FROM "bets" WHERE "user_id" = $1 AND "status" = $2',
      [userId, 'active']
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching active bets:', error);
    res.sendStatus(500);
  }
});

// Add a new bet for the current user
router.post('/', async (req, res) => {
  try {
    const { sportsbook, sport, player, prop_type, prop_number, amount } = req.body;
    const userId = req.user.id;
    await pool.query(
      'INSERT INTO "bets" ("user_id", "sportsbook", "sport", "player", "prop_type", "prop_number", "amount", "status") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, sportsbook, sport, player, prop_type, prop_number, amount, 'active']
    );
    res.sendStatus(201);
  } catch (error) {
    console.error('Error adding new bet:', error);
    res.sendStatus(500);
  }
});

// Update an existing bet for the current user
router.put('/:id', async (req, res) => {
  try {
    const { sportsbook, sport, player, prop_type, prop_number, amount } = req.body;
    const betId = req.params.id;

    
    const userId = req.user.id;
    const result = await pool.query(
      'UPDATE "bets" SET "sportsbook" = $1, "sport" = $2, "player" = $3, "prop_type" = $4, "prop_number" = $5, "amount" = $6 WHERE "id" = $7 AND "user_id" = $8 RETURNING *',
      [sportsbook, sport, player, prop_type, prop_number, amount, betId, userId]
    );

    if (result.rowCount === 0) {
      
      return res.sendStatus(403);
    }

    res.status(200).json(result.rows[0]); 
  } catch (error) {
    console.error('Error updating bet:', error);
    res.sendStatus(500);
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const betId = req.params.id;
    const userId = req.user.id;

    
    const result = await pool.query(
      'UPDATE "bets" SET "status" = $1 WHERE "id" = $2 AND "user_id" = $3 RETURNING *',
      [status, betId, userId]
    );

    if (result.rowCount === 0) {
      return res.sendStatus(403);
    }

    res.status(200).json(result.rows[0]); 
  } catch (error) {
    console.error('Error updating bet status:', error);
    res.sendStatus(500);
  }
});


router.get('/history', async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT * FROM "bets" WHERE "user_id" = $1 AND "status" != $2',
      [userId, 'active']
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bet history:', error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const betId = req.params.id;
    const userId = req.user.id;

    const result = await pool.query('DELETE FROM "bets" WHERE "id" = $1 AND "user_id" = $2', [betId, userId]);

    if (result.rowCount === 0) {
      return res.sendStatus(403);
    }

    res.sendStatus(204); 
  } catch (error) {
    console.error('Error deleting bet:', error);
    res.sendStatus(500);
  }
});

module.exports = router;




