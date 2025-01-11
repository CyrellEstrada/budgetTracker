const express = require('express')
const expensesController = require('../controllers/expenses')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', checkJwt, expensesController.getAllExpensesbyUserId)

router.get('/:id', checkJwt, expensesController.getExpenseById)

router.post('/', checkJwt, expensesController.createExpense)

router.put('/:id', checkJwt, expensesController.updateExpenseById)

router.delete('/:id', checkJwt, expensesController.deleteExpenseById)

module.exports = router