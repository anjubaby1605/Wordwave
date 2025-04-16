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
    res.send = function (body) {
      if (!res.locals._alreadyLogged) {
        res.locals._alreadyLogged = true;
        logAction(req, res, startTime, actionType, body);
      }
      return originalSend.call(this, body);
    };
    
    res.json = function (body) {
      if (!res.locals._alreadyLogged) {
        res.locals._alreadyLogged = true;
        logAction(req, res, startTime, actionType, body);
      }
      return originalJson.call(this, body);
    };
    

    next();
  };
};

async function logAction(req, res, startTime, actionType, responseBody) {
  try {
    console.log(`[Logger] Logging activity for ${actionType}`);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const userId = req.user?.id || null;
      const entityId = req.params.id || responseBody?._id;

      if (!userId || !entityId) return;
      if (!userId) {
        console.log('[Logger] No user ID found — skipping log.');
        return;
      }

      // Check for a recent log (within last 10 seconds)
      const existingLog = await Log.findOne({
        user: userId,
        entityId,
        action: actionType,
        timestamp: { $gte: new Date(Date.now() - 10000) }
      });

      if (existingLog) {
        console.log(`[Logger] Skipping duplicate log for user ${userId}, story ${entityId}, action "${actionType}"`);
        return;
      }

      await Log.create({
        action: actionType,
        entityType: 'story',
        entityId,
        user: userId,
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
