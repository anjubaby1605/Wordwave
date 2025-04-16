const fetchUserStories = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ msg: 'User not authenticated' });
    }

    const stories = await Story.find({ createdBy: req.user.id })
      .populate({
        path: 'snapshots',
        options: { sort: { order: 1 } },
      })
      .sort({ createdAt: -1 });

    if (!stories || stories.length === 0) {
      return res.status(404).json({ msg: 'No stories found for this user' });
    }

    req.stories = stories; // Attach stories to the request object
    next(); // pass control to the route handler
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
