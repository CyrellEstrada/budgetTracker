const express = require('express')
const usersController = require('../controllers/users')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/', checkJwt, usersController.getAllUsers)

router.get('/:id', checkJwt, usersController.getUserByUserId)

router.post('/', checkJwt, usersController.createUser)

router.put('/:id', checkJwt, usersController.updateUserById)

router.delete('/:id', checkJwt, usersController.deleteUserByUserId)

module.exports = router