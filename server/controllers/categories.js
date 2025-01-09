const mysql = require('mysql2')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

const getAllCategoriesByUserId = (req, res) => {
  let sql = "SELECT * FROM categories WHERE id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getCategoryById = (req, res) => {
  let sql = "SELECT * FROM categories WHERE id = ?"
  sql = mysql.format(sql, [ req.params.id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createCategory = (req, res) => {
  const { category_name } = req.body
  let sql = "INSERT INTO categories (category_name) VALUES (?)"
  sql = mysql.format(sql, [ category_name ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateCategoryById = (req, res) => {
  const { category_name } = req.body
  let sql = "UPDATE categories SET category_name = ? WHERE id = ?"
  sql = mysql.format(sql, [ category_name, parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteCategoryById = (req, res) => {
  let sql = "DELETE FROM categories WHERE id = ?"
  sql = mysql.format(sql, [ parseInt(req.params.id) ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} categories(s)` });
  })
}

module.exports = {
    getAllCategoriesByUserId,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
  }