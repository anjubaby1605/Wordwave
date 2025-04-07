const Log = require('../models/Log');

module.exports = (actionType) => {
  return async (req, res, next) => {
    // Only proceed for 'view' or 'edit' actions
    if (!['view', 'edit'].includes(actionType)) {
      return next();
    }

    const startTime = Date.now();

    // Store the original response methods
    const originalSend = res.send;
    const originalJson = res.json;

    // Create response interceptors
    res.send = function(body) {
      logAction(req, res, startTime, actionType, body);
      return originalSend.call(this, body);
    };

    res.json = function(body) {
      logAction(req, res, startTime, actionType, body);
      return originalJson.call(this, body);
    };

    next();
  };
};

async function logAction(req, res, startTime, actionType, responseBody) {
  try {
    // Only log successful requests (2xx status codes)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      await Log.create({
        action: actionType,
        entityType: 'story',
        entityId: req.params.id || responseBody?._id,
        user: req.user?._id || null,
        method: req.method,
        path: req.path,
        duration: Date.now() - startTime,
        timestamp: new Date()
      });
    }
  } catch (err) {
    console.error('Failed to log action:', err);
  }
}