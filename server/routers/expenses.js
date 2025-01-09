const express = require('express')
const expensesController = require('../controllers/expenses')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', expensesController.getAllExpensesbyUserId)

router.get('/:id', expensesController.getExpenseById)

router.post('/', expensesController.createExpense)

router.put('/:id', expensesController.updateExpenseById)

router.delete('/:id', expensesController.deleteExpenseById)

module.exports = router