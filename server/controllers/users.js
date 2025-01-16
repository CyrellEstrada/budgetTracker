const mysql = require('mysql2')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserByUserId = (req, res) => {
  let sql = "SELECT * FROM users WHERE user_id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  const { autho_id, email, first_name, last_name, username } = req.body;

  const sql = `
    INSERT INTO users (autho_id, email, first_name, last_name, username)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      email      = VALUES(email),
      first_name = VALUES(first_name),
      last_name  = VALUES(last_name),
      username   = VALUES(username)
  `;

  pool.query(sql, [autho_id, email, first_name, last_name, username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.sqlMessage });
    }
    return res.json({ message: 'User upserted successfully.' });
  });
};

const updateUserById = (req, res) => {
  const { first_name, last_name, email, username, password } = req.body
  let sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, username = ?, password = ? WHERE user_id = ?"
  sql = mysql.format(sql, [ first_name, last_name, email, username, password, parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByUserId = (req, res) => {
  let sql = "DELETE FROM users WHERE user_id = ?"
  sql = mysql.format(sql, [ parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserByUserId,
  createUser,
  updateUserById,
  deleteUserByUserId
}