const express = require('express');
const mongoose = require('mongoose');
const { isDocumentIdValid } = require('../utils');
const { INTERNAL_SERVER_ERROR, OKAY, BAD_REQUEST, NOT_FOUND } = require('../constants.js');
const { verifyUser } = require('../middlewares/authentication');

const Candidate = require('../models/candidate');
const Job = require('../models/job');
const User = require('../models/user');

const router = express.Router();

// Get all candidates
router.get('/', async (req, res, next) => {
  let candidates;
  try {
    candidates = await Candidate.find();
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OKAY).send(candidates);
});

// Get a candidate by its id
router.get('/:id', verifyUser, async (req, res, next) => {
  const { id } = req.params;

  if (!isDocumentIdValid(id)) {
    return res.status(BAD_REQUEST).send('Invalid candidate id');
  }

  let candidate;
  try {
    candidate = await Candidate.findById(id);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  if (!candidate) {
    return res.status(NOT_FOUND).send('Not found');
  }

  return res.status(OKAY).send(candidate);
});

// Add a new candidate
router.post('/', verifyUser, async (req, res, next) => {
  const { name, emailId, jobTitle, linkedin, github, jobid, user } = req.body;

  if (!name || !emailId) {
    return res.status(BAD_REQUEST).send();
  }

  if (!isDocumentIdValid(jobid)) {
    return res.status(BAD_REQUEST).send('Invalid job id');
  }

  let candidate;
  try {
    candidate = await Candidate.create({
      name,
      emailId,
      jobTitle,
      linkedin,
      github,
      jobsAppliedTo: [jobid],
      addedBy: user._id,
    });

    await Job.findByIdAndUpdate(jobid, {
      $push: { candidatesProposed: { candidate: candidate._id, status: 'PENDING' } },
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { 'producerInfo.candidatesCreated': candidate._id },
    });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OKAY).send(candidate);
});

module.exports = router;
