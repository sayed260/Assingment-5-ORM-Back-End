const postService = require('./post.service');
const bcrupt = require('bcrypt');



const createPost = async (req, res, next) => {
    try {
        const { title, content, userId } = req.body || {};
        const createdPost = await postService.createPost(title, content, userId);
        return res.status(201).json({ message: 'Post created successfully', post: createdPost });
    } catch (error) {
        next(error);
    }
}


const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params || {};
        const { userId } = req.body || {};
        const deletedPost = await postService.deletePost(postId, userId);
        return res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        next(error);
    }
}

const getPostsDetails = async (req, res, next) => {
    try {
        const posts = await postService.getPostsDetails();
        return res.status(200).json({ message: 'Posts fetched successfully', posts });
    } catch (error) {
        next(error);
    }
}   


const getCommentCount = async (req, res, next) => {
    try {
        const commentCount = await postService.getCommentCount();
        return res.status(200).json({ message: 'Comment count fetched successfully', commentCount });
    } catch (error) {
        next(error);
    }  
}


module.exports = {
    createPost,
    deletePost,
    getPostsDetails,
    getCommentCount
};


