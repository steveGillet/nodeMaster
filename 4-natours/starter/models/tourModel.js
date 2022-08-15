const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `A man needs a name`],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name cannot exceed 40 characters'],
      minlength: [10, 'A tour name must exceed 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain letters'],
    },
    slug: {
      type: String,
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
      enum: {
        values: ['easy', 'difficult', 'medium'],
        message: 'Difficulty must be easy, medium, or difficult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.4,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating can be at most 5'],
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
      validate: {
        validator: function (value) {
          // this only points to current document on NEW document creation, not update
          return value < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
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
    secret: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create(), not insertMany
// pre save hook
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Saving...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// this keyword points to current query
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
  console.log(`Query took ${Date.now() - this.start} ms`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secret: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model(`Tour`, tourSchema);

module.exports = Tour;
