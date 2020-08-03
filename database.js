const mongoose = require('mongoose');
require('dotenv').config();

const { COMPUTED_PROGRESS_STATE } = require('./types/progress');
const { PROVINCE } = require('./types/province');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@devsandbox.zi8eu.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(
    `connected to ${process.env.MONGO_USERNAME} :: ${process.env.MONGO_DATABASE_NAME}`
  );
});

const ProgressSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
    trim: true,
    enum: Object.values(PROVINCE),
  },
  computedDate: {
    type: Date,
    required: true,
  },
  method: {
    type: String,
    required: true,
    trim: true,
    enum: Object.values(COMPUTED_PROGRESS_STATE),
  },
  nonActiveCount: {
    type: Number,
    required: true,
    default: 0,
  },
  inProgressCount: {
    type: Number,
    required: true,
    default: 0,
  },
  doneCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = {
  Progress: mongoose.Mongoose.model('Progress', ProgressSchema),
};
