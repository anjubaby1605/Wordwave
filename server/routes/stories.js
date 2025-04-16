const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const storyController = require('../controllers/storyController');
const auth = require('../middlewares/auth');
const activityLogger = require('../middlewares/logger');
const logsController = require('../controllers/logController');

// @route   POST api/stories
// @desc    Create a story
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty()
    ]
  ],
  storyController.createStory
);


// @route   GET api/stories
// @desc    Get all stories
// @access  Public
router.get('/', storyController.getStories);

// @route   GET api/stories/:id
// @desc    Get story by ID
// @access  Public
router.get('/:id',auth,activityLogger('view'), storyController.getStory);
router.get('/public/:id', activityLogger('view'), storyController.getStory); 


// @route   PUT api/stories/:id
// @desc    Update story
// @access  Private
router.put(
  '/:id',
  auth,
  activityLogger('edit'),
  storyController.updateStory
);
router.get('/:id/userlogs',auth, logsController.getStoryActivity);
module.exports = router;

router.post('/:id/lock', auth, storyController.lockStory);
router.post('/:id/unlock', auth, storyController.unlockStory);