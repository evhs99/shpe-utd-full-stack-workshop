const express = require('express')

const {
    signUpUser,
    logInUser,
    getUsers,
    getOneUser,
    deleteUser,
    updateUser
} = require ('../controller/user.controller')

const router = express.Router()

router.get('/', getUsers)

router.post('/auth/signup', signUpUser)

router.post('/auth/login', logInUser)

router.get('/:id', getOneUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

module.exports = router