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



module.exports = router;