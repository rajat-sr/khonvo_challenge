const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    jobsAppliedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
    jobsLikedAt: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
    jobsAcceptedAt: [
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

module.exports = mongoose.model('Candidate', candidateSchema);
