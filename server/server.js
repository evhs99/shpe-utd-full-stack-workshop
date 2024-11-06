

require('dotenv').config()

const express = require('express') // back-end nodejs framework
const mongoose = require('mongoose') // library for interfacing with MongoDB
const cors = require('cors'); // for accessing API across applications and machines

// create Express.js server using JSON parsing and CORS middleware
const app = express()
app.use(express.json())
app.use(cors())

// import routes for posts
const postRoutes = require('./routes/post.route')
app.use('/api/posts', postRoutes)

// connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)

    // promise to then start the server after connecting to database
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Success! Connected to database cluster & listening on port', process.env.PORT)
        })
    })

    // print error if failed to connect to MongoDB or to start the server
    .catch((error) => {
        console.log(error)
    })