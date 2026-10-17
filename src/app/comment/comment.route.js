const { Router } = require('express');

const router = Router();


const commentController = require('./comment.controller');

router.post('/', commentController.createComment);
router.patch('/:id', commentController.updateComment);
router.post('/find-or-create', commentController.findOrCreateComment);
router.get('/search', commentController.searchCommentsByWord);
router.get('/newest/:postId', commentController.getNewestCommentsForPost);
r

module.exports = router;
