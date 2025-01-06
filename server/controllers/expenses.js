const mysql = require('mysql2')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

const getAllExpenses = (req, res) => {
    // May or may not use this
  pool.query("SELECT * FROM expenses", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getExpensesByUserId = (req, res) => {
  let sql = "SELECT * FROM user_expenses WHERE user_id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createExpense = (req, res) => {
  const { name, amount, category_id } = req.body
  let sql = "INSERT INTO expenses (name, amount, category_id) VALUES (?, ?, ?)"
  sql = mysql.format(sql, [ name, amount, category_id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateExpenseById = (req, res) => {
  const { name, amount, category_id } = req.body
  let sql = "UPDATE expenses SET name = ?, amount = ?, category_id = ?, WHERE id = ?"
  sql = mysql.format(sql, [ name, amount, category_id, req.params.id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteExpenseById = (req, res) => {
  let sql = "DELETE FROM expense WHERE id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} expense(s)` });
  })
}

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpense,
  updateExpenseById,
  deleteExpenseById
}