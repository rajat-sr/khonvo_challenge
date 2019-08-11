const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ['QUERIER', 'PRODUCER'],
      default: 'PRODUCER',
      required: true,
    },
    producerInfo: {
      candidatesCreated: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Candidate',
        },
      ],
      candidatesLiked: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Candidate',
        },
      ],
    },
    querierInfo: {
      jobsCreated: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
        },
      ],
      candidatesLiked: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Candidate',
        },
      ],
      candidatesRejected: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Candidate',
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
