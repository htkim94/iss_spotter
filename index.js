const {
  nextISSTimesForMyLocation,
} = require("./iss");

const timePrinter = (time) => {
  for (let t of time) {
    const d = new Date(0);
    d.setUTCSeconds(t.risetime);
    console.log(`Next pass at ${d} for ${t.duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, time) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  timePrinter(time);
})