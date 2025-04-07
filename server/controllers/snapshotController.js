exports.addSnapshot = async (req, res) => {
    try {
      const { storyId } = req.params;
      const { text, order, links } = req.body;
  
      const story = await Story.findByIdAndUpdate(
        storyId,
        {
          $push: {
            snapshots: {
              text,
              order,
              links: links || []
            }
          }
        },
        { new: true, runValidators: true }
      );
  
      res.status(201).json(story.snapshots);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.updateSnapshot = async (req, res) => {
    try {
      const { storyId, snapshotId } = req.params;
      const update = req.body;
  
      const story = await Story.findOneAndUpdate(
        { 
          _id: storyId,
          'snapshots._id': snapshotId 
        },
        {
          $set: {
            'snapshots.$.text': update.text,
            'snapshots.$.order': update.order,
            'snappackage.$.links': update.links
          }
        },
        { new: true, runValidators: true }
      );
  
      res.json(story.snapshots);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.deleteSnapshot = async (req, res) => {
    try {
      const { storyId, snapshotId } = req.params;
  
      const story = await Story.findByIdAndUpdate(
        storyId,
        {
          $pull: {
            snapshots: { _id: snapshotId }
          }
        },
        { new: true }
      );
  
      res.json(story.snapshots);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };