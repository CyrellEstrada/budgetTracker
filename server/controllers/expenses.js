const mysql = require('mysql2')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

const getAllExpensesbyUserId = (req, res) => {
  let sql = "SELECT * FROM expenses WHERE user_id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getExpenseById = (req, res) => {
  let sql = "SELECT * FROM expenses WHERE id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createExpense = (req, res) => {
  const { user_id, name, amount, category_id } = req.body
  let sql = "INSERT INTO expenses (user_id, name, amount, category_id) VALUES (?, ?, ?, ?)"
  sql = mysql.format(sql, [ user_id, name, amount, category_id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateExpenseById = (req, res) => {
  const { name, amount, category_id } = req.body
  let sql = "UPDATE expenses SET name = ?, amount = ?, category_id = ? WHERE id = ?"
  sql = mysql.format(sql, [ name, amount, category_id, parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteExpenseById = (req, res) => {
  let sql = "DELETE FROM expenses WHERE id = ?"
  sql = mysql.format(sql, [ parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} expense(s)` });
  })
}

module.exports = {
  getAllExpensesbyUserId,
  getExpenseById,
  createExpense,
  updateExpenseById,
  deleteExpenseById
}