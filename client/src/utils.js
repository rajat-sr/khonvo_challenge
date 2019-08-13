const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://khonvo-challenge.herokuapp.com/api' : 'http://localhost:5000/api';

module.exports = {
  BASE_URL,
};
