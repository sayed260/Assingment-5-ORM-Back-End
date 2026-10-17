const commentService = require('./comment.service');

async function createComment(req, res , next) {


const { content, postId, userId } = req.body || {};

try {
    const comment = await commentService.createComment(content,postId,userId,);
    res.status(201).json({ message: "Comment created successfully" });
} catch (error) {
    next(error);
}
};

const updateComment = async (req, res, next) => {
    const { userId, content } = req.body || {};
    const commentId = req.params.commentId || req.params.id;
    try {
        const comment = await commentService.updateComment(commentId, content, userId);
        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        next(error);
    }
}

const findOrCreateComment = async (req, res, next) => {
    const { content, postId, userId } = req.body || {};
    try {
        const comment = await commentService.findOrCreateComment(content, postId, userId);
        res.status(200).json({ message: "Comment found or created successfully", comment });
    } catch (error) {
        next(error);
    }
}

const searchCommentsByWord = async (req, res, next) => {
    const { word } = req.query || {};
    try {
        const comments = await commentService.searchCommentsByWord(word);
        res.status(200).json({ message: "Comments retrieved successfully", comments });
    } catch (error) {
        next(error);
    }
}

const getNewestCommentsForPost = async (req, res, next) => {
    const { postId } = req.params || {};
    try {
        const comments = await commentService.getNewestCommentsForPost(postId);
        res.status(200).json({ message: "Comments retrieved successfully", comments });
    } catch (error) {
        next(error);
    }
}

const getCommentDetailsById = async (req, res, next) => {
    const { id } = req.params || {};

    try {
        const comment = await commentService.getCommentDetailsById(id);
        res.status(200).json({ message: "Comment details retrieved successfully", comment });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createComment,
    updateComment,
    findOrCreateComment,
    searchCommentsByWord,
    getNewestCommentsForPost,
    getCommentDetailsById,
};
