const mysql = require('mysql2')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

// Quick test route
const testDb = (req, res) => {
    pool.query('SELECT 1 + 1 AS result', (err, rows) => {
      if (err) {
        console.error('Error executing test query', err);
        return res.status(500).send('DB Test Query Failed');
      }
      return res.json(rows);
    });
  };

  module.exports = {
    testDb
  }