const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// Routers
const userRouter = require('./routes/user.js');

mongoose.set('strictQuery', true);

require('dotenv').config();

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(express.static(path.resolve(__dirname, '../client')));

// deliver home page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// sending to userRouter
app.use('/user', userRouter);

//404 handler
app.use((req, res) => res.status(404).json('Page Not Found'));

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

mongoose
  .connect(
    'mongodb+srv://lillian:lillian@soloproject.dbm2wrr.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('conneted to the database');
    // listen for requests
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;
