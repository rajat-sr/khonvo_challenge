const express = require('express');
const mongoose = require('mongoose');
const Job = require('../models/job');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res, next) => {
  let jobs;
  try {
    jobs = await Job.find();
  } catch (e) {
    return res.status(500).send(e.message);
  }

  return res.status(200).send(jobs);
});

// Get a job by its id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid job id');
  }

  let jobs;
  try {
    jobs = await Job.findById(id);
  } catch (e) {
    return res.status(500).send(e.message);
  }

  if (!jobs) {
    return res.status(404).send('Not found');
  }

  return res.status(200).send(jobs);
});

// Add a new job
router.post('/', async (req, res, next) => {
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
    return res.status(400).send();
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
    return res.status(500).send(e.message);
  }

  return res.status(200).send(savedJob);
});

module.exports = router;
