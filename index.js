const { nextISSTimesForMyLocation, timePrinter } = require("./iss");

nextISSTimesForMyLocation((error, time) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  timePrinter(time);
});
