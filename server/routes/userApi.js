const express = require('express');
const mongoose = require('mongoose');
const json2csv = require('json-2-csv');
const { OAuth2Client } = require('google-auth-library');
const { verifyUser } = require('../middlewares/authentication');
const { isRoleValid } = require('../utils');
const {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  OKAY,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../constants.js');

const User = require('../models/user');
const Job = require('../models/job');
const Candidate = require('../models/candidate');

const router = express.Router();

const CLIENT_ID = process.env.GOOGLE_ID;

// Login/SignUp a user
router.post('/', async (req, res, next) => {
  const authToken = req.headers.authorization.split(' ')[1];
  const client = new OAuth2Client(CLIENT_ID);

  let user;
  let newUser = false;
  try {
    const ticket = await client.verifyIdToken({
      idToken: authToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    user = await User.findOne({ emailId: email });
    if (!user) {
      const userDoc = {
        name: payload.name,
        emailId: payload.email,
        googleId: payload.sub,
        imageUrl: payload.picture,
      };
      user = await User.create(userDoc);
      newUser = true;
    } else if (!user.role) {
      newUser = true;
    }
  } catch (e) {
    return res.status(UNAUTHORIZED).send(e.message);
  }

  return res.status(200).send({ newUser, role: user.role });
});

// Set user role
router.patch('/role', verifyUser, async (req, res) => {
  const { role } = req.body;
  const userid = req.body.user._id;

  if (!isRoleValid(role)) {
    return res.status(BAD_REQUEST).send();
  }

  try {
    await User.findByIdAndUpdate(userid, { $set: { role: role } }, { new: true });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OKAY).send({ role });
});

// Get points of a producer
router.get('/points', verifyUser, async (req, res) => {
  const { user } = req.body;

  if (user.role !== 'PRODUCER') {
    console.log(user.role);
    return res.status(BAD_REQUEST).send('Invalid role');
  }

  let points;
  if (!user.producerInfo.candidatesLiked.length) {
    points = 0;
  } else {
    points = user.producerInfo.candidatesLiked.length;
  }

  return res.status(OKAY).send({ points });
});

router.get('/likedcandidates', verifyUser, async (req, res) => {
  const currentuser = req.body.user;
  if (currentuser.role !== 'QUERIER') {
    return res.status(BAD_REQUEST).send('Not authorized to perform this operation');
  }

  let userObject;
  try {
    userObject = await User.findById(currentuser._id)
      .populate({
        path: 'querierInfo.candidatesLiked',
        populate: { path: 'jobsAppliedTo' },
      })
      .exec();
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send();
  }

  if (!userObject) {
    return res.status(NOT_FOUND).send();
  }

  const likedCandidates = userObject.querierInfo.candidatesLiked;
  const candidates = likedCandidates.map(candidate => {
    return {
      Name: candidate.name,
      Email: candidate.emailId,
      'Job Title': candidate.jobTitle,
      'LinkedIN profile': candidate.linkedin,
      'GitHub profile': candidate.github,
      'Job applied to': candidate.jobsAppliedTo.map(job => job.companyName).join(','),
    };
  });

  json2csv.json2csv(candidates, (e, csv) => {
    if (e) {
      return res.status(INTERNAL_SERVER_ERROR).send('Unable to generate CSV file');
    }
    res.set({
      'Content-Disposition': 'attachment; filename=\"candidates.csv\"',
      'Content-type': 'text/csv',
    });
    return res.send(csv);
  });
});

module.exports = router;
