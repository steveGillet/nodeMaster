console.log(arguments);
console.log(require(`module`).wrapper);

const Calc = require("./testModule1");

// module.exports
const cal = new Calc();
console.log(cal.add(3, 4));
console.log(cal.multiply(3, 4));
console.log(cal.divide(3, 4));

// exports
// const calc2 = require("./testModule2");
// console.log(calc2.add(2, 3));
// console.log(calc2.multiply(2, 3));
// console.log(calc2.divide(2, 3));
const { add, multiply, divide } = require("./testModule2");
console.log(add(3, 4));
console.log(multiply(3, 4));
console.log(divide(3, 4));

// caching
require("./testModule3")();
require("./testModule3")();
require("./testModule3")();
