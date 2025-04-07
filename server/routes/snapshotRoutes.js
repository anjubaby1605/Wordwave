const express = require('express');
const router = express.Router();
const snapshotController = require('../controllers/snapshotController');
const { authenticate } = require('../middlewares/auth');

router.post('/stories/:storyId/snapshots', 
  authenticate,
  snapshotController.addSnapshot
);

router.put('/stories/:storyId/snapshots/:snapshotId',
  authenticate,
  snapshotController.updateSnapshot
);

router.delete('/stories/:storyId/snapshots/:snapshotId',
  authenticate,
  snapshotController.deleteSnapshot
);

module.exports = router;