const mongoose = require('mongoose');
require('dotenv').config();

const { ProgressSchema } = require('./models/progress');

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

module.exports = {
  Progress: mongoose.Mongoose.model('Progress', ProgressSchema),
};
