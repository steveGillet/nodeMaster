const path = require('path');
const express = require(`express`);
const { userInfo } = require('os');
const { clear } = require('console');
const morgan = require(`morgan`);

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1 MIDDLEWARE
if (process.env.NODE_ENV === `development`) {
  app.use(morgan(`dev`));
}

// middleware function handle incoming request
// add body to object
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`Hello, my name is mids`);
  // always use next in middleware
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.post(`/`, (req, res) => {
//   res.send(`You can post to this endpoint`);
// });

// app.get(`/`, (req, res) => {
//   res
//     .status(200)
//     .json({ message: `This is the server talking`, app: `Natours` });
// });

// 2 ROUTE HANDLERS

// app.get(`/api/v1/tours`, getAllTours);

// : makes it variable, ? at end will make it optional
// app.get(`/api/v1/tours/:id`, getTour);

// app.post(`/api/v1/tours`, createTour);

// app.patch(`/api/v1/tours/:id`, updateTour);

// app.delete(`/api/v1/tours/:id`, deleteTour);

// 3 ROUTES

// router = app object
// app.route(`/api/v1/tours`).get(getAllTours).post(createTour);

// mounting router
app.use('/', viewRouter);
app.use(`/api/v1/tours`, tourRouter);
app.use(`/api/v1/users`, userRouter);

// 4 START SERVER

module.exports = app;
