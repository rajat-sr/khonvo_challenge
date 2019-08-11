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
      type: Schema.Types.ObjectId,
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
    },
    candidatesProposed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Job', jobSchema);
