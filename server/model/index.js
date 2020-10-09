const mongoose = require('mongoose');
const auth = require('./auth');
const todo = require('./todo');

const mongoUri = process.env.MONGO_URI;

if (mongoUri === undefined) {
  console.log('error connecting to mongodb');
} else {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('mongodb sucessfully connected');
    }
  );
}

module.exports = { mongoose, auth, todo };
