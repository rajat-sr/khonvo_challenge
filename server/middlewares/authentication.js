const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_ID;
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../constants');

const User = require('../models/user');

async function verifyUser(req, res, next) {
  let user;
  let authToken;

  try {
    authToken = req.headers.authorization.split(' ')[1];
    if (!authToken) {
      throw new Error('Empty Auth Token');
    }
  } catch (e) {
    console.error('[Authentication] ', e);
    return res.status(UNAUTHORIZED).send(e.message);
  }

  let email;
  try {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: authToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    email = payload.email;
  } catch (e) {
    console.error('[Authentication] ', e);
    return res.status(UNAUTHORIZED).send('Please logout and login again.');
  }

  try {
    user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error('User is not in database');
    }
  } catch (e) {
    console.error('[Authentication] ', e);
    return res.status(UNAUTHORIZED).send(e.message);
  }

  req.body.user = user;
  next();
}

module.exports = {
  verifyUser,
};
