const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const storyController = require('../controllers/storyController');
const auth = require('../middlewares/auth');
const activityLogger = require('../middlewares/logger');
const logsController = require('../controllers/logController');

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

router.get('/', storyController.getStories);
router.get('/:id',auth,activityLogger('view'), storyController.getStory);
router.get('/public/:id', activityLogger('view'), storyController.getStory); 

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

router.get('/user/mystories', auth, storyController.getUserStories);
