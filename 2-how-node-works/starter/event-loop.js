const { log } = require("console");
const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
// CHANGE THREADPOOL SIZE, default 4
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log(`Timer 1 Finished`), 0);
setImmediate(() => console.log(`Immediate 1 Finished`));

fs.readFile(`test-file.txt`, () => {
  console.log(`I/O Finished`);
  setTimeout(() => console.log(`Timer 2 Finished`), 0);
  setTimeout(() => console.log(`Timer 3 Finished`), 3000);
  setImmediate(() => console.log(`Immediate 2 Finished`));

  process.nextTick(() => console.log(`Next Tick Ticked`));

  // sync
  crypto.pbkdf2Sync(`password`, `salt`, 100000, 1024, `sha512`);
  console.log(Date.now() - start, `Encrypted`);
  crypto.pbkdf2Sync(`password`, `salt`, 100000, 1024, `sha512`);
  console.log(Date.now() - start, `Encrypted`);
  crypto.pbkdf2Sync(`password`, `salt`, 100000, 1024, `sha512`);
  console.log(Date.now() - start, `Encrypted`);
  crypto.pbkdf2Sync(`password`, `salt`, 100000, 1024, `sha512`);
  console.log(Date.now() - start, `Encrypted`);

  // async
  // crypto.pbkdf2(`password`, `salt`, 100000, 1024, `sha512`, () => {
  //   console.log(Date.now() - start, `Encrypted`);
  // });
});

console.log(`Hello from the other side`);
