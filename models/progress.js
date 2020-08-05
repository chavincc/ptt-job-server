const mongoose = require('mongoose');

const { CONSTRUCTION_METHOD } = require('../types/method');
const { PROVINCE } = require('../types/province');

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
    enum: Object.values(CONSTRUCTION_METHOD),
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
  ProgressSchema,
};
