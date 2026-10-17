const { prisma } = require('../../common/db/prisma');



async function createComment(content, postId, userId) {
    return await prisma.comment.create({
        data: {
            content,
            postId,
            userId
        },
    });
}

async function findCommentById(commentId) {
    return await prisma.comment.findUnique({
        where: {
            id: Number(commentId),
        },
    });
}

async function findCommentByDetails(content, postId, userId) {
    return await prisma.comment.findFirst({
        where: {
            content,
            postId: Number(postId),
            userId: Number(userId),
        },
    });
}

async function updateComment(commentId, content) {
    return await prisma.comment.update({
        where: {
            id: Number(commentId),
        },
        data: {
            content,
        },
    });
}


async function searchCommentsByWord(word) {
    const comments = await prisma.comment.findMany({
        where: {
            content: {
                contains: word,
                mode: 'insensitive', // Optional: makes the search case-insensitive
            },
        },
    });
    return comments;
}

async function getNewestCommentsForPost(postId) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: Number(postId),
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 3,
    });
    return comments;
}

async function getCommentDetailsById(commentId) {
    const comment = await prisma.comment.findUnique({
        where: {
            id: Number(commentId),
        },
        include: {
            user: true, // Include the user who made the comment
            post: true, // Include the post to which the comment belongs
        },
    });
    return comment;
}

module.exports = {
    createComment,
    findCommentById,
    findCommentByDetails,
    updateComment,
    searchCommentsByWord,
    getNewestCommentsForPost,
};