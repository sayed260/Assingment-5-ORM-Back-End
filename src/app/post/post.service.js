const postRepository = require('./post.repository')
const userRepository = require('../user/user.repository');


const register = async (email, password) => {

     //1- check if user already exists
    const userExist = postRepository.findUserByEmail(email);
    // 2- if yes 
    if (userExist) {
        return res.status(400).json({ message: 'User already exists' });
    }
    //3- hash the password
    const hashedPassword = await bcrupt.hash(password, 10);
    // 4- save the user to the database
    const createrUser = await postRepository.createUser(name, email, hashedPassword);
    //5- return success message 
    return createrUser; 
};


const createPost = async (title, content, userId) => {
    //1- check if user exists
    const postExist = await userRepository.findUserById(userId);
    //2- if no
    if (!postExist) {
        const error = new Error('no user found');
        error.statusCode = 404;
        throw error;
    }
    //3- create post
    const createdPost = await postRepository.createPost(title, content, userId);
    //4- return success message
    return createdPost;
};




const deletePost = async (postId, userId) => {
    //1- check if post exists
    const postExist = await postRepository.postExist(postId);
    //2- if no
    if (!postExist) {
        const error = new Error('no post found');
        error.statusCode = 404;
        throw error;
    }
    const post = await postRepository.findPostById(postId);
    //3- check if user is the owner of the post
    if (post.userId !== userId) {
        const error = new Error('you are not the owner of this post');
        error.statusCode = 403;
        throw error;
    }
    //4- delete post
    await postRepository.deletePost(postId);
    //5- return success message
    return { message: 'post deleted successfully' };

}



const getPostsDetails = async () => {
    const posts = await postRepository.getPostsDetails();
    return posts;
}

const getCommentCount = async () => {
    // Return comment counts for all posts; this repository query does not take a post ID.
    const commentCount = await postRepository.getCommentCount();
    return commentCount;
}



module.exports = {
    register,
    createPost,
    deletePost,
    getPostsDetails,
    getCommentCount
};

