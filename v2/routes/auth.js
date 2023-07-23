const express = require('express');
const { requestValidation, authenticate } = require('../middlewares');

const {
  signupSchema,
  loginSchema,
  changePasswordSchema,
} = require('../controllers/authController/schema');

const {
  signup,
  login,
  changePassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', requestValidation(signupSchema), signup);
router.post('/login', requestValidation(loginSchema), login);
router.post(
  '/change-password',
  authenticate,
  requestValidation(changePasswordSchema),
  changePassword
);

module.exports = router;
