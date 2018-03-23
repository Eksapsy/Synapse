import getRandomLowNumber from "./source/functions/getrandomlownumber.js";
import getRandomNumber from "./source/functions/getrandomnumber.js";
import logb from "./source/functions/logb.js";

// console.log(getRandomLowNumber(1, 100, 0.75));

var factor = 0.75;
var max = 100;
var min = 1;

var base = 1.0 / factor;
var evtcnt = Math.floor(Math.pow(base, max-min+1) - 1) / (base-1);
var rndnum = getRandomNumber(1, evtcnt);
var expflr = Math.floor(logb((rndnum-1) * (base-1) + 1, base));
var rndres = max - expflr + min;

console.log("base: ", base);
console.log("evtcnt: ", evtcnt);
console.log("rndnum: ", rndnum);
console.log("expflr: ", expflr);
console.log("rndres: ", rndres);