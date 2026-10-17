const { Router } = require('express');
const postController = require('./post.controller');

const router = Router();

router.post('/', postController.createPost);

router.delete('/:postId', postController.deletePost);
router.get('/details', postController.getPostsDetails);
router.get('/comment-count', postController.getCommentCount);

module.exports = router;