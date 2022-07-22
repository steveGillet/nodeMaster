const fs = require(`fs`);
const server = require(`http`).createServer();

server.on(`request`, (req, res) => {
  // // Solution 1
  // fs.readFile(`test-file.txt`, (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // // Solution 2: Streams
  // // back pressure when response cannot send as fast as it gets data from text file
  // const readable = fs.createReadStream(`test-file.txt`);
  // readable.on(`data`, (chunk) => {
  //   // response is a writeable stream
  //   res.write(chunk);
  // });
  // readable.on(`end`, () => {
  //   res.end();
  // });
  // readable.on(`error`, (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end(`File NOT Found`);
  // });

  // Solution 3
  // piping will handle speed of data coming in and going out
  const readable = fs.createReadStream(`test-file.txt`);
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`Listening...`);
});
