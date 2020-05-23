require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "travello_db",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

    let sql = [
      "DROP TABLE if exists flights;",
      "DROP TABLE if exists trips;", 
      "CREATE TABLE trips (id bigint NOT NULL AUTO_INCREMENT,destination TEXT NULL,departureDate TEXT NULL,returnDate TEXT NULL,necessaryDocuments TEXT NULL,hotelName TEXT NULL,hotelLocation TEXT NULL,PRIMARY KEY (id));",
      "CREATE TABLE flights (id bigint NOT NULL AUTO_INCREMENT, tripId bigint NOT NULL, flightNumber TEXT NULL, departureAirport TEXT NULL, arrivalAirport TEXT NULL, departureTime TIMESTAMP NULL, arrivalTime TIMESTAMP NULL, airline varchar(255) NULL, reservationId varchar(255) NULL, PRIMARY KEY (id), " + 
      "constraint flights_fk0 FOREIGN KEY (tripId) REFERENCES trips(id) on update cascade on delete cascade);"
    ]

    sql.forEach(e => { 
      con.query(e, function(err, result) {
        if (err) throw err;
        console.log("Tables creation was successful!"); 
      });
    });
    console.log("Closing...");
    con.end();
});
