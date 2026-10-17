const commentRepository = require('./comment.repository');
const userRepository = require('../user/user.repository');
const postRepository = require('../post/post.repository');

async function createComment(content, postId, userId) {
    // if userID not found in the database then throw error
    const userExist = await userRepository.findUserById(userId);
    if (!userExist) {
        throw new Error('User not found');
    }

    const postExist = await postRepository.findPostById(postId);
    if (!postExist) {
        throw new Error('Post not found');
    }

    const comment = await commentRepository.createComment(content, postId, userId);
    return comment;
}

const updateComment = async (commentId, content, userId) => {
    // 1- check if comment exists
    const comment = await commentRepository.findCommentById(commentId);
    // 2- if no
    if (!comment) {
        const error = new Error('no comment found');
        error.statusCode = 404;
        throw error;
    }
    // 3- check if user is the owner of the comment
    if (comment.userId !== Number(userId)) {
        const error = new Error('you are not the owner of this comment');
        error.statusCode = 403;
        throw error;
    }
    // 4- update comment
    const updatedComment = await commentRepository.updateComment(commentId, content);
    return updatedComment;
};


const findOrCreateComment = async (content, postId, userId) => {
    const existingComment = await commentRepository.findCommentByDetails(
        content,
        postId,
        userId,
    );

    if (existingComment) {
        return existingComment;
    }

    // Reuse the normal creation path, which verifies the user and post exist.
    return createComment(content, Number(postId), Number(userId));
}

// 4. Retrieve all comments that contain a specific word in their content and return the number of comments matched
// (use find and count). (0.5 Grade)
// o URL: GET /comments/search => (for example /comments/search?word=the)

const searchCommentsByWord = async (word) => {
    const comments = await commentRepository.searchCommentsByWord(word);
    //if no comments found then throw error
    if (comments.length === 0) {
        const error = new Error('no comments found');
        error.statusCode = 404;
        throw error;
    }
    return comments;
}


const getNewestCommentsForPost = async (postId) => {
    const comments = await commentRepository.getNewestCommentsForPost(postId);
    //if no comments found then throw error
    if (comments.length === 0) {
        const error = new Error('no comments found');
        error.statusCode = 404;
        throw error;
    }
    return comments;
}

// 6. Get Specific Comment By PK with User and Post Information. (0.5 Grade)
// o URL: GET /comments/details/:id

const getCommentDetailsById = async (commentId) => {
    const comment = await commentRepository.findCommentById(commentId);
    if (!comment) {
        const error = new Error('no comment found');
        error.statusCode = 404;
        throw error;
    }
    const user = await userRepository.findUserById(comment.userId);
    const post = await postRepository.findPostById(comment.postId);
    return {
        id: comment.id,
        content: comment.content,
        user: {
            id: user.id,
            name: user.name,
        },
        post: {
            id: post.id,
            title: post.title,
        },
    };
}

module.exports = {
    createComment,
    updateComment,
    findOrCreateComment,
    searchCommentsByWord,
    getNewestCommentsForPost,
    getCommentDetailsById,
};



