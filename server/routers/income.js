const express = require('express')
const incomesController = require('../controllers/income')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', checkJwt, incomesController.getAllIncomesByUserId)

router.get('/:id', checkJwt, incomesController.getIncomeById)

router.post('/', checkJwt, incomesController.createIncome)

router.put('/:id', checkJwt, incomesController.updateIncomeById)

router.delete('/:id', checkJwt, incomesController.deleteIncomeById)

module.exports = router