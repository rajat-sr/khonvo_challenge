const express = require('express');
const mongoose = require('mongoose');
const Job = require('../models/job');

const router = express.Router();

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