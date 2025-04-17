const Story = require('../models/Story');
const Snapshot = require('../models/Snapshot');

exports.addSnapshot = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { title, content, links } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // 1. Find the current highest order for the story
    const lastSnapshot = await Snapshot.findOne({ story: storyId })
      .sort({ order: -1 })
      .limit(1);

    const nextOrder = lastSnapshot ? lastSnapshot.order + 1 : 1;

    // 2. Create the snapshot
    const snapshot = await Snapshot.create({
      story: storyId,
      title,
      content,
      order: nextOrder,
      links: links ? JSON.parse(links) : [],
      image
    });

    // 3. Add snapshot to the story
    await Story.findByIdAndUpdate(
      storyId,
      { $push: { snapshots: snapshot._id } },
      { new: true }
    );

    res.status(201).json(snapshot);
  } catch (err) {
    console.error('Error adding snapshot:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate snapshot order for this story.' });
    }
    res.status(400).json({ error: err.message });
  }
};

  
exports.updateSnapshot = async (req, res) => {
  try {
    const { snapshotId } = req.params;
    const { title, content, order, links } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Build the update object conditionally
    const updateData = {
      ...(title && { title }),
      ...(content && { content }),
      ...(order !== undefined && { order }),
      ...(links && { links: typeof links === 'string' ? JSON.parse(links) : links }),
      ...(image && { image })
    };

    const updatedSnapshot = await Snapshot.findByIdAndUpdate(
      snapshotId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedSnapshot) {
      return res.status(404).json({ error: 'Snapshot not found' });
    }

    res.json(updatedSnapshot);
  } catch (err) {
    console.error('Error updating snapshot:', err);
    res.status(400).json({ error: err.message });
  }
};

  
  exports.deleteSnapshot = async (req, res) => {
    try {
      const { storyId, snapshotId } = req.params;
  
      // 1. Delete the snapshot document
      await Snapshot.findByIdAndDelete(snapshotId);
  
      // 2. Pull the snapshot reference from the story
      await Story.findByIdAndUpdate(
        storyId,
        { $pull: { snapshots: snapshotId } },
        { new: true }
      );
  
      res.status(200).json({ message: 'Snapshot deleted successfully' });
    } catch (err) {
      console.error('Error deleting snapshot:', err);
      res.status(500).json({ error: 'Failed to delete snapshot' });
    }
  };
  