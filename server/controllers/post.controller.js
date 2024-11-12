const Post = require('../models/post.model')
const mongoose = require('mongoose')

const createPost = async (req, res) => {
    const { title, description } = req.body;

    const post = await Post.create({
        title,
        description,
        likes: 0
    })

    res.status(201).json(post);
}

module.exports = {createPost}