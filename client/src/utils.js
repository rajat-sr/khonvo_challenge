const BASE_URL = process.env.NODE_ENV === 'PRODUCTION' ? '' : 'http://localhost:5000/api';

module.exports = {
  BASE_URL,
};
