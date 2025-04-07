const Story = require('../models/Story');
const Logs = require('../models/Log');

exports.getStoryActivity = async (req, res) => {
  try {
    console.log('Fetching logs for story:', req.params.id); // Debug log
    
    // 1. Verify story exists
    const story = await Story.findById(req.params.id).select('title').lean();
    if (!story) {
      console.log('Story not found');
      return res.status(404).json({ 
        success: false,
        message: 'Story not found' 
      });
    }

    // 2. Get logs
    const logs = await Logs.find({ 
      entityType: 'story',
      entityId: req.params.id 
    })
    .sort({ timestamp: -1 })
    .populate('user', 'username')
    .lean();

    console.log(`Found ${logs.length} logs`); // Debug log
    
    res.json({
      success: true,
      logs,
      story
    });

  } catch (err) {
    console.error('Controller error:', err); // Detailed error log
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activity logs',
      error: err.message // Include actual error message
    });
  }
};