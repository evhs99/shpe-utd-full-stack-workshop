

require('dotenv').config()

const express = require('express') // nodejs framework
const mongoose = require('mongoose') // for mongodb
const cors = require('cors'); // for accessing API in across applications and machines

const app = express()
app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/user.route')
app.use('/api/users', userRoutes)

const postRoutes = require('./routes/post.route')
app.use('/api/posts', postRoutes)

const commentRoutes = require('./routes/comment.route')
app.use('/api/comments', commentRoutes)


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Success! Connected to database cluster & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


process.env