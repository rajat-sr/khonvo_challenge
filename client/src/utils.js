const axios = require('axios');

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('khonvotoken')}`;

module.exports = {
  BASE_URL: 'http://localhost:5000/api',
  axios,
};
