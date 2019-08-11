const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyDescription: {
      type: String,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    compensation: {
      type: Number,
      trim: true,
    },
    candidatesRequired: {
      type: Number,
      required: true,
      default: 1,
    },
    candidatesProposed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
      },
    ],
    status: {
      type: String,
      enum: ['OPEN', 'INPROCESS', 'CLOSED'],
      default: 'OPEN',
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Job', jobSchema);
