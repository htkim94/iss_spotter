const { nextISSTimesForMyLocation } = require("./iss_promised");
const { timePrinter } = require('./iss');

nextISSTimesForMyLocation()
  .then((time) => {
    timePrinter(time);
})
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })
