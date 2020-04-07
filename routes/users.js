var express = require('express');
var router = express.Router();
const db = require("../model/helper");

function getTrips(res) {
  db("SELECT * FROM allTrips ORDER BY id ASC;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
} 

//GET trips 
router.get("/", function(req, res, next) {
  db("SELECT * FROM allTrips ORDER BY id ASC;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

//GET one trip by id
router.get("/:id", function(req, res, next) {
  db(`SELECT * FROM allTrips WHERE id=${req.params.id};`)
  .then(results => {
    res.send(results.data[0]);
  })
  .catch(err => res.status(500).send(err));
});

//INSERT 
router.post("/", function(req, res, next) {
  // req.body === {destination: "Madrid"}
  db(`INSERT INTO allTrips (destination, departureDate, returnDate, necessaryDocuments, hotelName, hotelLocation) VALUES ('${req.body.destination}', '${req.body.departureDate}', '${req.body.returnDate}', '${req.body.necessaryDocuments}', '${req.body.hotelName}', '${req.body.hotelLocation}' )`
  )
  .then(results => {
    getTrips(res)
  })
  .catch(err => res.status(500).send(err));
});

//UPDATE
router.put("/:id", function(req, res, next) {
  db(`UPDATE allTrips SET destination='${req.body.destination}', departureDate='${req.body.departureDate}', returnDate='${req.body.returnDate}', necessaryDocuments='${req.body.necessaryDocuments}', hotelName='${req.body.hotelName}', hotelLocation='${req.body.hotelLocation}' WHERE id=${req.params.id};`
  )
  .then(results => {
    getTrips(res)
  })
  .catch(err => res.status(500).send(err));
});


//DELETE a trip from the DB
router.delete("/:id", function(req, res, next) {
  db(`DELETE FROM allTrips WHERE id=${req.params.id}`)
    .then(results => {
      getTrips(res);
    })
  .catch(err => res.status(500).send(err));
});


//INSERT new trip to DB
/*router.post("/", function(req, res, next) {
  db(`INSERT INTO allTrips (destination, startingDate, endDate, necessaryDocuments, outwardJourneyDate, outwardJourneyLocation, outwardJourneyticket, returnJourneyDate, returnJourneyLocation, returnJourneyticket, hotelName, checkInDate, checkOutDate, hotelLocation, attractions, restaurants, events, carPickUpDate, carPickUpLocation, carReturnDate, carReturnLocation, notes) VALUES ('${req.body.destination}', ${req.body.startingDate}, ${req.body.endDate}, '${req.body.necessaryDocuments}', ${req.body.outwardJourneyDate}, '${req.body.outwardJourneyLocation}', '${req.body.outwardJourneyticket}', ${req.body.returnJourneyDate}, '${req.body.returnJourneyLocation}', '${req.body.returnJourneyticket}', '${req.body.hotelName}', ${req.body.checkInDate}, ${req.body.checkOutDate}, '${req.body.hotelLocation}', '${req.body.attractions}', '${req.body.restaurants}', '${req.body.events}', ${req.body.carPickUpDate}, '${req.body.carPickUpLocation}', ${req.body.carReturnDate}, '${req.body.carReturnLocation}', '${req.body.notes}')`
  )
  .then(results => {
    getTrips(res)
  })
  .catch(err => res.status(500).send(err));
});

//UPDATE a trip by id
router.put("/:id", function(req, res, next) {
  db(`UPDATE allTrips SET destination='${req.body.destination}', startingDate=${req.body.startingDate}, endDate=${req.body.endDate}, necessaryDocuments='${req.body.necessaryDocuments}', outwardJourneyDate=${req.body.outwardJourneyDate}, outwardJourneyLocation='${req.body.outwardJourneyLocation}', outwardJourneyticket='${req.body.outwardJourneyticket}', returnJourneyDate=${req.body.returnJourneyDate}, returnJourneyLocation='${req.body.returnJourneyLocation}', returnJourneyticket='${req.body.returnJourneyticket}', hotelName='${req.body.hotelName}', checkInDate=${req.body.checkInDate}, checkOutDate=${req.body.checkOutDate}, hotelLocation='${req.body.hotelLocation}', attractions='${req.body.attractions}', restaurants='${req.body.restaurants}', events='${req.body.events}', carPickUpDate=${req.body.carPickUpDate}, carPickUpLocation='${req.body.carPickUpLocation}', carReturnDate=${req.body.carReturnDate}, carReturnLocation='${req.body.carReturnLocation}', notes='${req.body.notes}' WHERE id=${req.params.id};`)
    .then(results => {
      getTrips(res);
    })
    .catch(err => res.status(500).send(err)); 
}); */


module.exports = router;