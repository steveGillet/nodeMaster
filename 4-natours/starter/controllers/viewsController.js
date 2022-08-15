const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get Tour Data From Collection
  const tours = await Tour.find();
  // Build Template

  // Render Template Using Tour Data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTours = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Troll',
  });
};
