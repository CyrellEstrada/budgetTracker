const express = require('express')
const usersController = require('../controllers/users')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/', usersController.getAllUsers)

router.get('/:id', usersController.getUserByUserId)

router.post('/', usersController.createUser)

router.put('/:id', usersController.updateUserById)

router.delete('/:id', usersController.deleteUserByUserId)

module.exports = router