
// require mongoose and the Schema module to define new data schema model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define schema model for 'post' documents in the database
const postSchema = new Schema ({
    title: { type: String, required: true, minlength: 10, maxLength: 140 },
    description: { type: String, required: true, minlength: 10 },
    likes: { type: Number, required: true }
})

// export this model as a module
module.exports = mongoose.model('Post', postSchema)