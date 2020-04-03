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

  let sql =
    "DROP TABLE if exists allTrips; CREATE TABLE allTrips( id INT NOT NULL AUTO_INCREMENT, destination TEXT NULL, startingDate DATE NULL, endDate DATE NULL, necessaryDocuments TEXT NULL, outwardJourneyDate DATETIME NULL, outwardJourneyLocation TEXT NULL, outwardJourneyticket TEXT NULL, returnJourneyDate DATETIME NULL, returnJourneyLocation TEXT NULL, returnJourneyticket TEXT NULL, hotelName TEXT NULL, checkInDate DATE NULL, checkOutDate DATE NULL, hotelLocation TEXT NULL, attractions TEXT NULL, restaurants TEXT NULL, events TEXT NULL, carPickUpDate DATETIME NULL, carPickUpLocation TEXT NULL, carReturnDate DATETIME NULL, carReturnLocation TEXT NULL, notes TEXT NULL, PRIMARY KEY (`id`));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation allTrips was successful!");

    console.log("Closing...");
  });

  con.end();
});
