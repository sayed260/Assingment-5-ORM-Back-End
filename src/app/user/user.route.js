const { Router } = require('express');

const router = Router();

const userController = require('./user.controller');



router.post('/signup', userController.createUser);
router.patch('/:id', userController.upsertUser);
router.get('/by-email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);



// router.get('/', userController.register);
// router.post('/', userController.logout);

module.exports = router;