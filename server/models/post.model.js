
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String},
    likes: { type: Number }

})

module.exports = mongoose.model('Post', postSchema)