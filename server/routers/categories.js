const express = require('express')
const categoriesController = require('../controllers/categories')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', checkJwt, categoriesController.getAllCategoriesByUserId)

router.get('/:id', checkJwt, categoriesController.getCategoryById)

router.post('/', checkJwt, categoriesController.createCategory)

router.put('/:id', checkJwt, categoriesController.updateCategoryById)

router.delete('/:id', checkJwt, categoriesController.deleteCategoryById)

module.exports = router