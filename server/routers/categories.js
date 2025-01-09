const express = require('express')
const categoriesController = require('../controllers/categories')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/all/:id', categoriesController.getAllCategoriesByUserId)

router.get('/:id', categoriesController.getCategoryById)

router.post('/', categoriesController.createCategory)

router.put('/:id', categoriesController.updateCategoryById)

router.delete('/:id', categoriesController.deleteCategoryById)

module.exports = router