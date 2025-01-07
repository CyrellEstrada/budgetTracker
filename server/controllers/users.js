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
  console.log(req.body)
  const { first_name, last_name, email, username, password } = req.body
  let sql = "INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)"
  sql = mysql.format(sql, [ first_name, last_name, email, username, password ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

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