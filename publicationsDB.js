const scholar = require("google-scholar");
const mongoose = require("mongoose");
const fs = require(`fs`);

mongoose
  .connect(`mongodb://localhost:27017/publicationsTest`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true.valueOf,
  })
  .then(() => console.log(`DB Connection Established`));

const pubSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `A man needs a name`],
    unique: true,
  },
  url: {
    type: String,
  },
  authors: {
    type: [String],
    required: [true, `pub must have authors`],
  },
  description: {
    type: String,
  },
  pdf: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Pubs = mongoose.model(`Neuber`, pubSchema);

const importData = async (results) => {
  try {
    await Pubs.create(results);
    console.log(`Data Successfully Loaded`);
    fs.writeFile(`${__dirname}/neuber.json`, JSON.stringify(results), (err) => {
      // 201 = created
      res.status(201).json({
        status: `success`,
        data: {
          results,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// importData([
//   {
//     title: `Work 1`,
//     url: `google.com`,
//     authors: [`Sam`, `George`],
//     description: `Cool Work`,
//     pdf: `google.com`,
//   },
//   {
//     title: `Work 2`,
//     url: `google.com`,
//     authors: [`Sam`, `George`],
//     description: `Cool Work`,
//     pdf: `google.com`,
//   },
// ]);

scholar
  .search("Andreas Neuber Texas Tech")
  .then((resultsObj) => {
    console.log(resultsObj);
    console.log(typeof resultsObj);
    importData(resultsObj);
  })
  .catch((err) => {
    console.log(err);
  });
