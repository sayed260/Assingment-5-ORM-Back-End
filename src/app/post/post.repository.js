const { prisma } = require('../../common/db/prisma');



const postExist = async (postId) => {
    const post = await prisma.post.findFirst({
    where: {
        id: Number(postId),
    },
  });

    return post ? true : false;
}




const createPost = async (title, content, userId) => {
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            userId: userId
        }
    })
    return post;
}   



const deleteUser = async (id) => {
    try {
        const user = await  prisma.user.delete({
        where: {
            id: id
        }
    })
    return user;
    
    } catch (error) {
        return null
    }

}

const findPostById = async (id) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id),
        },
    });
    return post;
}


const deletePost = async (id) => {

        const post = await prisma.post.delete({
            where: {
                id: Number(id),
            },
        });
        return post;
}


const getPostsDetails = async () => {
    return await prisma.post.findMany({
        select: {
        id: true,
        title: true,

        user: {
            select: {
            name: true,
            },
        },

        comments: {
            select: {
            id: true,
            content: true,
            },
        },
    },
    });
};

const getCommentCount = async () => {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            _count: {
                select: {
                    comments: true,
                },
            },
        },
    });

    return posts.map((post) => ({
        id: post.id,
        title: post.title,
        commentCount: post._count.comments,
    }));
};



// const getCommentCount = async (postId) => {  
//     return await prisma.comment.count({
//         where: {
//             postId: Number(postId),
//         },
//     });
// }


module.exports = {
    createPost,
    postExist,
    findPostById,
    deletePost,
    getPostsDetails ,
    getCommentCount,
};