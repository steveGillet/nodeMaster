// const fs = require('fs');
const Tour = require(`./../models/tourModel`);

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour ID: ${val}`);
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     return res.status(404).json({ status: 'fail', message: `Invalid ID` });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({ status: 'fail', message: `Bad Request` });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  // console.log(req.requestTime);
  try {
    // BUILD QUERY
    // FILTERING
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...req.query };
    const exFields = [`page`, `sort`, `limit`, `fields`];
    exFields.forEach((field) => delete queryObj[field]);

    console.log(req.query, queryObj);

    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: `easy`,
    // });

    // ADVANCED FILTERING

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));

    // { difficulty: `easy`, duration: { $gte: 5 } }

    // const query = Tour.find()
    //   .where(`duration`)
    //   .equals(5)
    //   .where(`difficulty`)
    //   .equals(`easy`);

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: `success`,
      results: tours.length,
      // requestedAt: req.requestTime,
      data: {
        // if they have same name, don't have to write both
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((ele) => ele.id === id);

  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: `success`,
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: `success`,
      data: {
        tour: newTour,
      },
    });

    // // console.log(req.body);
    // const newID = tours[tours.length - 1].id + 1;
    // const newTour = Object.assign({ id: newID }, req.body);

    // tours.push(newTour);
    // fs.writeFile(
    //   `${__dirname}/dev-data/data/tours-simple.json`,
    //   JSON.stringify(tours),
    //   (err) => {
    //     // 201 = created
    //     res.status(201).json({
    //       status: `success`,
    //       data: {
    //         tour: newTour,
    //       },
    //     });
    //   }
    // );
  } catch (err) {
    res.status(400).json({
      status: `fail`,
      message: `Invalid Data`,
    });
  }
};

exports.updateTour = async (req, res) => {
  // const id = req.params.id * 1;
  // let tour = tours.find((ele) => ele.id === id);
  // const updatedTour = Object.assign({ id }, tour, req.body);
  // tour = updatedTour;
  // tours[id] = tour;
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     // 201 = created
  //     res.status(201).json({
  //       status: `success`,
  //       data: {
  //         tour,
  //       },
  //     });
  //   }
  // );
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true.valueOf,
    });

    res.status(200).json({
      status: `success`,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: `fail`,
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    // 204 = deleted
    res.status(204).json({
      status: `success`,
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: `fail`,
      message: err,
    });
  }
};
