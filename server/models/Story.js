const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  snapshots: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Snapshot' 
  }],
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // isLocked: { type: Boolean, default: false },
  // lockedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now }
});

storySchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = new Date();
  }

  if (this.isModified('title')) {
    this.title = this.title.trim();
  }
  
  next();
});

module.exports = mongoose.model('Story', storySchema);