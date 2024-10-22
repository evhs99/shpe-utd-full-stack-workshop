const User = require('../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const signUpUser = async (req, res) => {
    try {
        const { username, password, bio } = req.body

        if (validator.isEmpty(password) || validator.isEmpty(username)){
            return res.status(401).json({ message: 'Please fill out all fields' })
        }

        switch (true) {
            case !validator.isStrongPassword(password):
                return res.status(401).json({ message: 'Password not strong enough' })
                break;
            case !validator.isAlphanumeric(username):
                return res.status(401).json({ message: 'Username must be alphanumeric' })
                break;
            default:
                console.log("Both username and password are present");
        }

        // user already exists in the database
        const foundUser = await User.findOne({ username }).exec()
        if (foundUser) {
            return res.status(401).json({ message: 'User already exists' })
        }

        // salt and hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        
        // create new user in the db
        const newUser = new User({ username, password: hash });
        const savedUser = await newUser.save();

        // generate access token
        const accessToken = jwt.sign(
            {
                "user": {
                    "username": username,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1hr' }
        )

        // generate refresh token
        const refreshToken = jwt.sign(
            { "username": username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // Remove password from response
        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            bio: newUser.bio,
            accessToken,
            refreshToken
        }

        res.status(201).json(userResponse)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const logInUser = async (req, res) => {
    try {
        const { username, password } = req.body

        // validate form data
        if (validator.isEmpty(username) || validator.isEmpty(password)){
            return res.status(401).json({ message: 'Please fill out both fields' })
        }

        // user not found
        const foundUser = await User.findOne({ username }).exec()
        if (!foundUser) return res.status(401).json({ message: 'Invalid credentials' })
        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return res.status(401).json({ message: 'Invalid credentials' })

        // generate access token
        const accessToken = jwt.sign(
            {
                "user": {
                    "username": foundUser.username,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1hr' }
        )
    
        // generate refresh token
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // Remove password from response
        const userResponse = {
            id: foundUser._id,
            username: foundUser.username,
            bio: foundUser.bio,
            accessToken,
            refreshToken
        }
        
        res.json(userResponse)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        // Exclude password field from the query
        const users = await User.find({}).select('-password')
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user' })
        }
        // Exclude password field from the query
        const user = await User.findById(id).select('-password')
        if (!user) {
            return res.status(404).json({ error: 'No such user' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user' })
        }
        // Exclude password field from the response
        const user = await User.findOneAndDelete({ _id: id }).select('-password')
        if (!user) {
            return res.status(404).json({ error: 'No such user' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user' })
        }
        // Exclude password field from the response
        const user = await User.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        ).select('-password')
        if (!user) {
            return res.status(404).json({ error: 'No such user' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    signUpUser,
    logInUser,
    getUsers,
    getOneUser,
    deleteUser,
    updateUser
}