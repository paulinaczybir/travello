var express = require('express');
var router = express.Router();
const db = require("../model/helper");

function getTrips(res) {
  db("SELECT * FROM trips ORDER BY id ASC;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
} 


//GET trips 
router.get("/", function(req, res, next) {
  db("SELECT * FROM trips ORDER BY id ASC;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

//GET one trip by id
router.get("/:id", function(req, res, next) {
  db(`SELECT * FROM trips WHERE id=${req.params.id};`)
  .then(results => {
    res.send(results.data[0]);
  })
  .catch(err => res.status(500).send(err));
});

//INSERT new trip
router.post("/", function(req, res, next) {
  // req.body === {destination: "Madrid"}
  db(`INSERT INTO trips (destination, departureDate, returnDate, necessaryDocuments, hotelName, hotelLocation) VALUES ('${req.body.destination}', '${req.body.departureDate}', '${req.body.returnDate}', '${req.body.necessaryDocuments}', '${req.body.hotelName}', '${req.body.hotelLocation}' )`
  )
  .then(results => {
    getTrips(res)
  })
  .catch(err => res.status(500).send(err));
});

//UPDATE
router.put("/:id", function(req, res, next) {
  db(`UPDATE trips SET destination='${req.body.destination}', departureDate='${req.body.departureDate}', returnDate='${req.body.returnDate}', necessaryDocuments='${req.body.necessaryDocuments}', hotelName='${req.body.hotelName}', hotelLocation='${req.body.hotelLocation}' WHERE id=${req.params.id};`
  )
  .then(results => {
    getTrips(res)
  })
  .catch(err => res.status(500).send(err));
});


//DELETE a trip from the DB
router.delete("/:id", function(req, res, next) {
  db(`DELETE FROM trips WHERE id=${req.params.id}`)
    .then(results => {
      getTrips(res);
    })
  .catch(err => res.status(500).send(err));
});

//INSERT a flight
router.post("/:tripId/flights", function(req, res) {
  db(`INSERT INTO flights (tripId, flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, airline, reservationId) VALUES (${req.params.tripId}, '${req.body.flightNumber}', '${req.body.departureAirport}', '${req.body.arrivalAirport}', ${req.body.departureTime}, ${req.body.arrivalTime}, '${req.body.airline}', '${req.body.reservationId}')`)
  .then(result => {
    return db(`SELECT * FROM flights WHERE tripId=${req.params.tripId} ORDER BY id ASC;`);
  })
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
})

//GET flights by tripId
router.get("/:tripId/flights", function(req, res, next) {
  db(`SELECT * FROM flights WHERE tripId=${req.params.tripId};`)
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

//DELETE flight by flightId 
router.delete("/:tripId/flights/:flightId", function(req, res, next) {
  db(`DELETE FROM flights WHERE id=${req.params.flightId}`)
  .then(result => {
    return db(`SELECT * FROM flights WHERE tripId=${req.params.tripId} ORDER BY id ASC;`);
  })
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});


module.exports = router;