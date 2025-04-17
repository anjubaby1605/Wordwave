const Story = require('../models/Story');
const Snapshot = require('../models/Snapshot');
const Logs = require('../models/Log');
const mongoose = require('mongoose');

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
      { session, ordered: true }
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

exports.updateStory = async (req, res) => {
  try {
    const { title, content, tags, snapshots } = req.body;

    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const snapshotIds = [];

    for (let snapshot of snapshots) {
      if (snapshot._id) {
        // Update existing snapshot
        await Snapshot.findByIdAndUpdate(snapshot._id, snapshot);
        snapshotIds.push(snapshot._id);
      } else {
        // Create new snapshot
        const newSnapshot = new Snapshot({
          story: updatedStory._id,
          ...snapshot
        });
        const savedSnap = await newSnapshot.save();
        snapshotIds.push(savedSnap._id);
      }
    }

    updatedStory.snapshots = snapshotIds;
    await updatedStory.save();

    const populatedStory = await Story.findById(updatedStory._id).populate('snapshots');

    res.status(200).json(populatedStory);
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ message: 'Error updating story', error: error.message });
  }
};

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

exports.lockStory = async (req, res) => {
  const userId = req.user.id;
  const storyId = req.params.id;

  const story = await Story.findById(storyId);

  if (!story) return res.status(404).json({ msg: 'Story not found' });

  if (story.isLocked && story.lockedBy?.toString() !== userId) {
    return res.status(403).json({ msg: 'Story is currently being edited by another user' });
  }

  story.isLocked = true;
  story.lockedBy = userId;
  await story.save();

  res.json({ msg: 'Story locked for editing', lockedBy: userId });
};

exports.unlockStory = async (req, res) => {
  const userId = req.user.id;
  const storyId = req.params.id;

  const story = await Story.findById(storyId);
  if (!story) return res.status(404).json({ msg: 'Story not found' });

  if (story.lockedBy?.toString() !== userId) {
    return res.status(403).json({ msg: 'You do not have the lock on this story' });
  }

  story.isLocked = false;
  story.lockedBy = null;
  await story.save();

  res.json({ msg: 'Story unlocked' });
};

exports.getUserStories = async (req, res) => {
  try {
    const userId = req.user.id;
    const stories = await Story.find({ createdBy: userId }).populate('snapshots');
    res.status(200).json(stories);
  } catch (err) {
    console.error('Error fetching user stories:', err);
    res.status(500).json({ error: 'Failed to fetch user stories' });
  }
};
