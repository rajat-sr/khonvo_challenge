const mongoose = require('mongoose');

const processQueueSchema = new mongoose.Schema(
  {
    job: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ProcessQueue', processQueueSchema);
