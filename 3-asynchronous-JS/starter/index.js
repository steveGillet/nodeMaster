const { log } = require('console');
const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`File Not Found ={`);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`Can't write good ={`);
      resolve(`Wroted`);
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const results = await Promise.all([res1Prom, res2Prom, res3Prom]);
    const imgs = results.map((ele) => ele.body.message);
    console.log(imgs);

    // console.log(res.body.message);

    await writeFilePro(`dog-img.txt`, imgs.join(`\n`));
    console.log(`Random Doggo Saved!`);
  } catch (err) {
    console.log(err);
    throw err;
  }
  return `2: Ready Player 1`;
};

// console.log(`1: Get Pics`);
// getDogPic()
//   .then((two) => {
//     console.log(two);
//     console.log(`3: Got Pics`);
//   })
//   .catch((err) => {
//     console.log(`error time`);
//   });

// iefe immediately envoked function expression
(async () => {
  try {
    console.log(`1: Get Pics`);
    const two = await getDogPic();
    console.log(two);
    console.log(`3: Got Pics`);
  } catch (err) {
    console.log(`Error Time!`);
  }
})();

// async function returns promise automatically
// console.log(two);
// console.log(`3: Got Pics`);

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro(`dog-img.txt`, res.body.message);
//     // fs.writeFile(`dom-img.txt`, , (err) => {
//     //   console.log(`Random Dog Image Saved`);
//     // });
//   })
//   .then(() => {
//     console.log(`Random Dog Saved`);
//   })
//   .catch((err) => console.log(err));
