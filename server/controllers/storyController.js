const Story = require('../models/Story');
const Snapshot = require('../models/Snapshot');
const Logs = require('../models/Log');
const mongoose = require('mongoose');

// Helper for transaction handling
const handleTransaction = async (res, transactionFn) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await transactionFn(session);
    await session.commitTransaction();
    return result;
  } catch (err) {
    await session.abortTransaction();
    console.error(err.message);
    res.status(500).send('Server Error');
  } finally {
    session.endSession();
  }
};

// Create story with snapshots
exports.createStory = async (req, res) => {
  await handleTransaction(res, async (session) => {
    const { title, content, tags, snapshots } = req.body;

    // 1. Create story
    const story = await Story.create([{
      title,
      content,
      tags,
      createdBy: req.user.id,
      lastEditedBy: req.user.id
    }], { session });

    // 2. Create snapshots
    const createdSnapshots = await Snapshot.create(
      snapshots.map((snapshot, index) => ({
        ...snapshot,
        story: story[0]._id,
        order: index,
        createdBy: req.user.id
      })), 
      { session }
    );

    // 3. Link snapshots to story
    story[0].snapshots = createdSnapshots.map(s => s._id);
    await story[0].save({ session });

    const populatedStory = await Story.findById(story[0]._id)
      .populate('snapshots')
      .session(session);

    res.json(populatedStory);
  });
};

// Get all stories with snapshots
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'snapshots',
        options: { sort: { order: 1 } }
      });
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get single story with snapshots
exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate({
        path: 'snapshots',
        options: { sort: { order: 1 } }
      }).lean();

    if (!story) return res.status(404).json({ msg: 'Story not found' });
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update story and snapshots
exports.updateStory = async (req, res) => {
  await handleTransaction(res, async (session) => {
    const { title, content, tags, snapshots } = req.body;

    // 1. Verify story exists and check lock
    const story = await Story.findById(req.params.id).session(session);
    if (!story) return res.status(404).json({ msg: 'Story not found' });

    if (story.isLocked && story.lockedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Story is locked by another user' });
    }

    // 2. Delete old snapshots and create new ones
    await Snapshot.deleteMany({ story: story._id }, { session });
    const createdSnapshots = await Snapshot.create(
      snapshots.map((snapshot, index) => ({
        ...snapshot,
        story: story._id,
        order: index,
        lastEditedBy: req.user.id
      })), 
      { session }
    );

    // 3. Update story
    story.title = title;
    story.content = content;
    story.tags = tags;
    story.snapshots = createdSnapshots.map(s => s._id);
    story.lastEditedBy = req.user.id;
    await story.save({ session });

    const populatedStory = await Story.findById(story._id)
      .populate({
        path: 'snapshots',
        options: { sort: { order: 1 } }
      })
      .session(session);

    res.json(populatedStory);
  });
};

// Get activity logs
exports.getStoryActivity = async (req, res) => {
  try {
    const logs = await Logs.find({ storyId: req.params.id })
      .sort({ timestamp: -1 })
      .populate('userId', 'username email');
    res.json(logs);
  } catch (err) {
    console.error('Error fetching activity:', err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};