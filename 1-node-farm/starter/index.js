// file system module
const fs = require('fs');
const http = require(`http`);
const url = require(`url`);
const replaceTemplate = require('./modules/replaceTemplate');
const scholar = require('google-scholar');

const slugify = require('slugify');
const { toUnicode } = require('punycode');

///////////////////////////////////////////////////
//FILES

// // blocking, sync
// const text = fs.readFileSync(`./txt/input.txt`, `utf-8`);
// console.log(text);

// const textFor = `This is everything about the avocado: ${text}. \nFor the good of America. On ${Date.now()}`;
// fs.writeFileSync(`./txt/output.txt`, textFor);
// console.log(`Filed.`);

// // nonblocking, async
// fs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
//   if (err) return console.log(`Error :'(`);
//   fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
//       console.log(data3);

//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, `utf-8`, (err) => {
//         console.log(`written`);
//       });
//     });
//   });
// });
// console.log(`reading`);

//////////////////////////////////////////////////////////////
// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const dataObject = JSON.parse(data);

const slugs = dataObject.map((ele) =>
  slugify(ele.productName, { lower: true })
);
console.log(slugs);

console.log(slugify(`Fresh Avacados`, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHTML = dataObject
      .map((ele) => replaceTemplate(templateCard, ele))
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

    res.end(output);
  }
  // PRODUCT
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObject[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  }
  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  // NOT FOUND
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page Not Found...</h1>');
  }

  // res.end("This is the server speaking.");
});

// scholar.all("Andreas Neuber texas tech").then((resultsObj) => {
//   console.log(resultsObj);
// });
//also see 3000 or 80 / 127 local host ip address
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to you. Port 8000');
});
