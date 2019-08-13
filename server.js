const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const mongodbConnection = process.env.MONGO_CONNECTION;

const jobRoutes = require('./server/routes/jobApi');
const candidateRoutes = require('./server/routes/candidateApi');
const userRoutes = require('./server/routes/userApi');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Khonvo' });
});

app.use('/api/user/', userRoutes);
app.use('/api/job/', jobRoutes);
app.use('/api/candidate/', candidateRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

try {
  (async function() {
    console.log('Starting server.');
    try {
      await mongoose.connect(mongodbConnection, {
        useNewUrlParser: true,
        useFindAndModify: false,
      });
    } catch (e) {
      console.error(e);
      server.close(() => console.log('Server stopped.'));
    }
  })();
} catch (e) {
  console.log(e);
}
