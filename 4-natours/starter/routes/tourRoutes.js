const express = require('express');

const router = express.Router();
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  // checkID,
  // checkBody,
  aliasTopTours,
  getTourStats,
  getMonthly,
} = require(`./../controllers/tourController`);

// param middleware, val = value of parameter
// router.param(`id`, checkID);

router.route(`/top5cheap`).get(aliasTopTours, getAllTours);

router.route(`/tourStats`).get(getTourStats);
router.route(`/monthly/:year`).get(getMonthly);

router.route(`/`).get(getAllTours).post(createTour);

router.route(`/:id`).get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
