const express = require('express')
const budgetController = require('../controllers/budget')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', checkJwt, budgetController.getAllBudgetsbyUserId)

router.get('/:id', checkJwt, budgetController.getBudgetById)

router.post('/', checkJwt, budgetController.createBudget)

router.put('/:id', checkJwt, budgetController.updateBudgetById)

router.delete('/:id', checkJwt, budgetController.deleteBudgetById)

module.exports = router