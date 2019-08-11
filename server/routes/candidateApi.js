const express = require('express');
const mongoose = require('mongoose');
const { isValidDocumentId } = require('../utils');
const { INTERNAL_SERVER_ERROR, OKAY, BAD_REQUEST, NOT_FOUND } = require('../constants.js');

const Candidate = require('../models/candidate');
const Job = require('../models/job');

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
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!isValidDocumentId(id)) {
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
router.post('/', async (req, res, next) => {
  const { name, emailId, jobTitle, linkedin, github, jobid } = req.body;

  if (!name || !emailId) {
    return res.status(BAD_REQUEST).send();
  }

  if (!isValidDocumentId(jobid)) {
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
    });

    await Job.findByIdAndUpdate(
      jobid,
      { $push: { candidatesProposed: { candidate: candidate._id, status: 'PENDING' } } },
    );
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OKAY).send(candidate);
});

module.exports = router;
