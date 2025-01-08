const express = require('express')
const incomesController = require('../controllers/income')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', incomesController.getAllIncomesbyUserId)

router.get('/:id', incomesController.getIncomeById)

router.post('/', incomesController.createIncome)

router.put('/:id', incomesController.updateIncomeById)

router.delete('/:id', incomesController.deleteIncomeById)

module.exports = router