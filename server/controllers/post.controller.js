const Post = require('../models/post.model')
const mongoose = require('mongoose')

// Create a new post
const createPost = async (req, res) => {
    try {
        // Extract title and description from the request body
        const { title, description } = req.body
        
        // Create a new post document with the provided title, description, and default likes of 0
        const post = await Post.create({ 
            title, 
            description, 
            likes: 0 // Initialize likes to 0 for new posts
        })
        
        // Respond with the created post and a 201 status code (created)
        res.status(201).json(post)
    } catch (error) {
        // Check if the error is a validation error (from Mongoose)
        if (error.name === 'ValidationError') {
            const validationErrors = {}
            
            // Loop over validation errors and collect the error messages
            Object.keys(error.errors).forEach(key => {
                validationErrors[key] = error.errors[key].message
            })
            
            // Respond with a 400 Bad Request status and the validation errors
            return res.status(400).json({ error: 'Validation Error', details: validationErrors })
        }
        
        // For all other errors, respond with the error message
        res.status(400).json({ error: error.message })
    }
}

// Get all posts, sorted by the number of likes in descending order
const getPosts = async (req, res) => {
    try {
        // Fetch all posts from the database and sort by likes in descending order
        const posts = await Post.find({}).sort({ likes: -1 })
        
        // Respond with the list of posts and a 200 OK status
        res.status(200).json(posts)
    } catch (error) {
        // In case of error, respond with the error message
        res.status(400).json({ error: error.message })
    }
}

// Get a single post by its ID
const getPost = async (req, res) => {
    try {
        const { id } = req.params
        
        // Check if the provided post ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid post ID' })
        }
        
        // Fetch the post with the given ID from the database
        const post = await Post.findById(id)
        
        // If no post is found, respond with a 404 Not Found status
        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }
        
        // Respond with the post and a 200 OK status
        res.status(200).json(post)
    } catch (error) {
        // Handle errors by sending the error message
        res.status(400).json({ error: error.message })
    }
}

// Update a post's details (title, description, etc.)
const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        
        // Check if the provided post ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid post ID' })
        }

        // Update the post with the provided ID, using the request body for new values
        const post = await Post.findOneAndUpdate(
            { _id: id },         // Match post by ID
            { ...req.body },     // Update fields with the data from the request body
            { new: true,         // Return the updated post
              runValidators: true // Run schema validation on update
            }
        )
        
        // If no post is found, return a 404 Not Found status
        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }
        
        // Respond with the updated post and a 200 OK status
        res.status(200).json(post)
    } catch (error) {
        // Handle validation errors separately, similar to the `createPost` function
        if (error.name === 'ValidationError') {
            const validationErrors = {}
            
            Object.keys(error.errors).forEach(key => {
                validationErrors[key] = error.errors[key].message
            })
            
            // Respond with the validation error details
            return res.status(400).json({ error: 'Validation Error', details: validationErrors })
        }
        
        // For all other errors, send the error message
        res.status(400).json({ error: error.message })
    }
}

// Delete a post by its ID
const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        
        // Check if the provided post ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid post ID' })
        }
        
        // Attempt to delete the post by its ID
        const post = await Post.findOneAndDelete({ _id: id })
        
        // If no post was found to delete, return a 404 Not Found status
        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }
        
        // Respond with the deleted post and a 200 OK status
        res.status(200).json(post)
    } catch (error) {
        // Handle any errors that occur during deletion
        res.status(400).json({ error: error.message })
    }
}

// Update the likes for a post (increment or decrement based on action)
const updateLikes = async (req, res) => {
    try {
        const { id } = req.params
        const { action } = req.body // Expecting action to be 'increment' or 'decrement'
        
        // Check if the provided post ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid post ID' })
        }
        
        // Fetch the post by its ID
        const post = await Post.findById(id)
        
        // If no post is found, return a 404 Not Found status
        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }
        
        // Determine the update operation based on the action
        const update = { 
            $inc: { 
                likes: action === 'increment' ? 1 : -1 // Increment or decrement the likes
            } 
        }
        
        // Update the post's likes count
        const updatedPost = await Post.findByIdAndUpdate(
            id,          // Find the post by ID
            update,      // Apply the like update
            { new: true } // Return the updated post
        )
        
        // Respond with the updated post
        res.status(200).json(updatedPost)
    } catch (error) {
        // Handle errors during the like update process
        res.status(400).json({ error: error.message })
    }
}

// export all functions so they can be used in routes
module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    updateLikes
}
