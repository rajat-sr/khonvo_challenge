const express = require('express');
const mongoose = require('mongoose');
const { isDocumentIdValid, isJobStatusValid } = require('../utils');
const { INTERNAL_SERVER_ERROR, OKAY, BAD_REQUEST, NOT_FOUND } = require('../constants.js');

const { verifyUser } = require('../middlewares/authentication');

const Job = require('../models/job');
const Candidate = require('../models/candidate');

const router = express.Router();

// Get all jobs
router.get('/', verifyUser, async (req, res, next) => {
  let jobs;
  try {
    jobs = await Job.find();
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OKAY).send(jobs);
});

// Get a job by its id
router.get('/:id', verifyUser, async (req, res, next) => {
  const { id } = req.params;

  if (!isDocumentIdValid(id)) {
    return res.status(BAD_REQUEST).send('Invalid job id');
  }

  let jobs;
  try {
    jobs = await Job.findById(id).populate({ path: 'candidatesProposed.candidate' });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  if (!jobs) {
    return res.status(NOT_FOUND).send('Not found');
  }

  return res.status(OKAY).send(jobs);
});

// Add a new job
router.post('/', verifyUser, async (req, res, next) => {
  const {
    companyName,
    companyDescription,
    jobTitle,
    jobDescription,
    location,
    compensation,
    candidatesRequired,
  } = req.body;
  const addedBy = '123456789012';

  if (!companyName || !jobTitle || !jobDescription || !location || !candidatesRequired) {
    return res.status(BAD_REQUEST).send();
  }

  let savedJob;
  try {
    savedJob = await Job.create({
      companyName,
      companyDescription,
      jobTitle,
      jobDescription,
      location,
      compensation,
      candidatesRequired,
      addedBy,
    });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OKAY).send(savedJob);
});

// Change status of a job by its id
router.patch('/:id/status', verifyUser, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!isDocumentIdValid(id)) {
    return res.status(BAD_REQUEST).send('Invalid job id');
  }

  if (isJobStatusValid(status)) {
    return res.status(BAD_REQUEST).send('Invalid status');
  }

  let modifiedJob;
  try {
    modifiedJob = await Job.findByIdAndUpdate(id, { $set: { status: status } }, { new: true });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OKAY).send(modifiedJob);
});

// Like/Reject a candidate
async function likeOrRejectCandidate(req, res) {
  const { jobid, candidateid } = req.params;
  const { like } = req.body;

  if (!isDocumentIdValid(jobid) || !isDocumentIdValid(candidateid)) {
    return res.status(BAD_REQUEST).send('Invalid job id or candidate id');
  }

  let updatedJob;
  let candidateStatus = like ? 'LIKED' : 'REJECTED';
  try {
    updatedJob = await Job.findOneAndUpdate(
      { _id: jobid, 'candidatesProposed.candidate': candidateid },
      { $set: { 'candidatesProposed.$.status': candidateStatus } },
      { new: true },
    );
    if (like) {
      await Candidate.findByIdAndUpdate(candidateid, { $push: { jobsLikedAt: jobid } });
    }
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  if (!updatedJob) {
    return res.status(NOT_FOUND).send();
  }

  return res.status(OKAY).send(updatedJob);
}

// Like a candidate
router.patch(
  '/:jobid/like/:candidateid',
  verifyUser,
  (req, res, next) => {
    req.body.like = true;
    next();
  },
  likeOrRejectCandidate,
);

// Reject a candidate
router.patch(
  '/:jobid/reject/:candidateid',
  verifyUser,
  (req, res, next) => {
    req.body.like = false;
    next();
  },
  likeOrRejectCandidate,
);

module.exports = router;
