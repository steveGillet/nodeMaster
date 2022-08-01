const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `A man needs a name`],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, `Tour must have a duration`],
  },
  maxGroupSize: {
    type: Number,
    required: [true, `Tour must have a group size`],
  },
  difficulty: {
    type: String,
    required: [true, `Tour must have a difficult`],
  },
  ratingAverage: {
    type: Number,
    default: 4.4,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, `A man needs a price`],
  },
  discount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, `A tour must have a description`],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    //name would be in database actual image in file system
    type: String,
    required: [true, `Tour must have an image cover`],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});
const Tour = mongoose.model(`Tour`, tourSchema);

module.exports = Tour;
