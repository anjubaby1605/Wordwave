const express = require('express');
const router = express.Router();
const snapshotController = require('../controllers/snapshotController');
const { authenticate } = require('../middlewares/auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // You can customize storage

router.post('/stories/:storyId/snapshots', upload.single('image'), snapshotController.addSnapshot);


router.put(
  '/stories/:storyId/snapshots/:snapshotId',
  upload.single('image'),
  snapshotController.updateSnapshot
);

router.delete('/stories/:storyId/snapshots/:snapshotId',
  //authenticate,
  snapshotController.deleteSnapshot
);

module.exports = router;