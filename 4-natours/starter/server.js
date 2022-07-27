const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `./config.env` });
const app = require(`./app`);

// console.log(app.get(`env`));
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  `<PASSWORD>`,
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`DB Connection Established`));

// // instance of Tour model
// const testTour = new Tour({
//   name: `The Camper`,
//   price: 1022,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => console.log(`Error Saving:`, err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
