const express = require('express');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  OKAY,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../constants.js');

const User = require('../models/user');

const router = express.Router();

const CLIENT_ID = process.env.GOOGLE_ID;

// Login/SignUp a user
router.post('/', async (req, res, next) => {
  const authToken = req.headers.authorization.split(' ')[1];
  const client = new OAuth2Client(CLIENT_ID);

  let user;
  try {
    const ticket = await client.verifyIdToken({
      idToken: authToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    user = await User.findOne({ emailId: email });
    if (!user) {
      const newUser = {
        name: payload.name,
        emailId: payload.email,
        googleId: payload.sub,
        imageUrl: payload.picture,
      };
      user = await User.create(newUser);
    }
  } catch (e) {
    return res.status(UNAUTHORIZED).send(e.message);
  }

  return res.status(200).send(user.name);
});

module.exports = router;
