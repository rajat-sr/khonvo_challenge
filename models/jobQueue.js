const mongoose = require('mongoose');

const jobQueueSchema = new mongoose.Schema(
  {
    job: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('JobQueue', jobQueueSchema);
