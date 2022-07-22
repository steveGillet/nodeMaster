const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID: ${val}`);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: `Invalid ID` });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ status: 'fail', message: `Bad Request` });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: `success`,
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      // if they have same name, don't have to write both
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);

  res.status(200).json({
    status: `success`,
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 = created
      res.status(201).json({
        status: `success`,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  let tour = tours.find((ele) => ele.id === id);
  const updatedTour = Object.assign({ id }, tour, req.body);

  tour = updatedTour;
  tours[id] = tour;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 = created
      res.status(201).json({
        status: `success`,
        data: {
          tour,
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  // 204 = deleted
  res.status(204).json({
    status: `success`,
    data: null,
  });
};
