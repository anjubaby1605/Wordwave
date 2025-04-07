const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/logController');
const { authenticate } = require('../middlewares/auth'); // If using authentication


router.get('/stories/:id/userlogs', 
 // authMiddleware, // Optional authentication
 activityLogController.getStoryActivity
);


module.exports = router;