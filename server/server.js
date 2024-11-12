
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const postRoutes = require('./routes/post.route')
app.use('/api/posts', postRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, console.log("connected"));
    })
    .catch((error) => {
        console.log(error);
    })