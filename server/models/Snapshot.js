const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema({
  story: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story',
    required: true 
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  links: [{
    url: { type: String, required: true },
    description: String
  }],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
snapshotSchema.index({ story: 1, order: 1 }, { unique: true });

// Pre-save hook for Snapshot
snapshotSchema.pre('save', async function(next) {
  // Auto-set timestamps
  if (this.isNew) {
    this.createdAt = new Date();
  }
  
  // Ensure order is set if not provided
  if (this.isNew && !this.order) {
    const count = await mongoose.model('Snapshot').countDocuments({ story: this.story });
    this.order = count;
  }
  
  // Validate links
  if (this.isModified('links')) {
    this.links = this.links.map(link => ({
      url: link.url.trim(),
      description: link.description?.trim() || ''
    }));
  }
  
  next();
});

module.exports = mongoose.model('Snapshot', snapshotSchema);