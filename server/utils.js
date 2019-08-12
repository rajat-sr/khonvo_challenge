const mongoose = require('mongoose');

function isDocumentIdValid(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function isJobStatusValid(status) {
  return !status || (status !== 'OPEN' && status !== 'INPROCESS' && status !== 'CLOSED');
}

function isRoleValid(role) {
  return role === 'PRODUCER' || role === 'QUERIER';
}

module.exports = {
  isDocumentIdValid,
  isJobStatusValid,
  isRoleValid
};
