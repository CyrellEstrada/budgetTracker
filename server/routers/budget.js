const express = require('express')
const budgetController = require('../controllers/budget')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', budgetController.getAllBudgetsbyUserId)

router.get('/:id', budgetController.getBudgetById)

router.post('/', budgetController.createBudget)

router.put('/:id', budgetController.updateBudgetById)

router.delete('/:id', budgetController.deleteBudgetById)

module.exports = router