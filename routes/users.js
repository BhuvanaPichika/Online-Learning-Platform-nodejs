const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post(
    '/',
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Invalid email'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    userController.createUser
  );
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
