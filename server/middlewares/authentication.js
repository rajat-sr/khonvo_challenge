const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_ID;

async function verifyUser(req, res, next) {
  let user;
  try {
    const authToken = req.headers.authorization.split(' ')[1];
    if (!authToken) {
      throw new Error('Empty Auth Token');
    }

    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: authToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error('User is not in database');
    }
  } catch (e) {
    return res.status(UNAUTHORIZED).send(e.message);
  }

  req.user = user;
  next();
}

module.exports = {
  verifyUser,
};
