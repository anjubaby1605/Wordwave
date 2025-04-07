const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  action: { 
    type: String, 
    required: true,
    enum: ['view', 'edit'] // Only these two actions
  },
  entityType: { 
    type: String, 
    default: 'story' 
  },
  entityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  method: String,
  path: String,
  duration: Number, // in milliseconds
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Log', LogSchema);