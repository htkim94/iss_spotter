const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // const coord = {
    //   latitude: JSON.parse(body).latitude,
    //   longitude: JSON.parse(body).longitude,
    // };

    //Change to ES6 destructuring
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyoverTimes = (coords, callback) => {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) return callback(error, null);

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyoverTimes(coord, (error, time) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, time);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
