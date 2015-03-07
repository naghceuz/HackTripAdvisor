var request = require('request');

var attractionsArray = [];

request({url: 'http://api.tripadvisor.com/api/partner/2.0/location/60745/attractions?key=HackTripAdvisor-ade29ff43aed', json: true}, function(err, res, json) {
    if (err) {
        throw err;
    }
    // console.log(json);
    for (j = 0; j < 20; j++) {
      arrayAdd(j, json);
    }
});

function arrayAdd(i, obj) {
  attractionsArray.push(obj.data[j].name);
  console.log(attractionsArray[i]);
}

// console.log(attractionsArray[0]);

module.exports = attractionsArray;