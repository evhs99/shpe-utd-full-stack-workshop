
const express = require ('express')
const router = express.Router()

const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    updatelikes
} = require('../controllers/post.controller')

// router.get("/", getPosts) // GET all posts

// router.get('/:id', getPost) // GET single post by id

router.post('/', createPost) // POST new post

// router.patch('/:id', updatePost) // PATCH update post

// router.delete('/:id', deletePost) // DELETE post

// router.patch('/:id/likes', updateLikes)

module.exports = router