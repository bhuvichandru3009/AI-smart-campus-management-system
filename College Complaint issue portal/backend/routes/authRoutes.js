const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authMiddleware } = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = require('express').Router();

router.post(
  '/login',
  [
    body('email').trim().notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  authController.login
);

router.post(
  '/signup',
  [
    body('email').trim().notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('name').optional().trim(),
  ],
  validate,
  authController.signup
);

router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
