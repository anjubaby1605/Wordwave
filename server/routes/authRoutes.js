// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// Protected route example
// router.get('/me', authController.protect, (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: req.user
//     }
//   });
// });

module.exports = router;