const mysql = require('mysql2')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

const getAllBudgetsbyUserId = (req, res) => {
  let sql = "SELECT * FROM budget WHERE user_id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
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
  const { user_id, savings_goal } = req.body
  let sql = "INSERT INTO budget (user_id, savings_goal) VALUES (?, ?)"
  sql = mysql.format(sql, [ user_id, savings_goal ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateBudgetById = (req, res) => {
  const { savings_goal } = req.body
  let sql = "UPDATE budget SET savings_goal = ? WHERE id = ?"
  sql = mysql.format(sql, [ savings_goal, parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteBudgetById = (req, res) => {
  let sql = "DELETE FROM budget WHERE id = ?"
  sql = mysql.format(sql, [ parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} budget(s)` });
  })
}

module.exports = {
  getAllBudgetsbyUserId,
  getBudgetById,
  createBudget,
  updateBudgetById,
  deleteBudgetById
}