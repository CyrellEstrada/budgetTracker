const mysql = require('mysql2')
const pool = require('../../../sql/connection')
const { handleSQLError } = require('../../../sql/error')

const getAllBudget = (req, res) => {
    // May or may not use this
  pool.query("SELECT * FROM budget", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getBudgetById = (req, res) => {
  let sql = "SELECT * FROM budget WHERE id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createBudget = (req, res) => {
  const { name, amount, category_id } = req.body
  let sql = "INSERT INTO budget (name, amount, category_id) VALUES (?, ?, ?)"
  sql = mysql.format(sql, [ name, amount, category_id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateBudgetById = (req, res) => {
  const { name, amount, category_id } = req.body
  let sql = "UPDATE budget SET name = ?, amount = ?, category_id = ?, WHERE id = ?"
  sql = mysql.format(sql, [ name, amount, category_id, req.params.id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteBudgetById = (req, res) => {
  let sql = "DELETE FROM budget WHERE id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} budget(s)` });
  })
}

module.exports = {
  getAllBudget,
  getBudgetById,
  createBudget,
  updateBudgetById,
  deleteBudgetById
}