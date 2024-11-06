
// utilize Express.js to create API routes
const express = require('express')
const router = express.Router()

// require functions from the controller to be executed
const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    updateLikes
} = require('../controllers/post.controller')

// GET all posts
router.get('/', getPosts)

// GET single post by id
router.get('/:id', getPost)

// POST new post
router.post('/', createPost)

// PATCH/update post
router.patch('/:id', updatePost)

// DELETE post
router.delete('/:id', deletePost)

// PATCH/update likes (special route)
router.patch('/:id/likes', updateLikes)

// export this router as a module
module.exports = router