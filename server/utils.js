const mongoose = require('mongoose');

function isValidDocumentId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function isJobStatusValid(status) {
  return !status || (status !== 'OPEN' && status !== 'INPROCESS' && status !== 'CLOSED');
}

module.exports = {
  isValidDocumentId,
  isJobStatusValid
};
