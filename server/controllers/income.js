const mysql = require('mysql2')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

const getAllIncomesbyUserId = (req, res) => {
  let sql = "SELECT * FROM income WHERE user_id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getIncomeById = (req, res) => {
  let sql = "SELECT * FROM income WHERE id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createIncome = (req, res) => {
  const { name, amount, category_id } = req.body
  let sql = "INSERT INTO income (name, amount, category_id) VALUES (?, ?, ?)"
  sql = mysql.format(sql, [ name, amount, category_id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateIncomeById = (req, res) => {
  const { name, amount, category_id } = req.body
  let sql = "UPDATE income SET name = ?, amount = ?, category_id = ? WHERE id = ?"
  sql = mysql.format(sql, [ name, amount, category_id, parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteIncomeById = (req, res) => {
  let sql = "DELETE FROM income WHERE id = ?"
  sql = mysql.format(sql, [ parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} Income(s)` });
  })
}

module.exports = {
  getAllIncomesbyUserId,
  getIncomeById,
  createIncome,
  updateIncomeById,
  deleteIncomeById
}