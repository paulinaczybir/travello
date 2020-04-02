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
  database: DB_NAME || "",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists newTravel; CREATE TABLE newTravel( id INT NOT NULL AUTO_INCREMENT, destination TEXT NOT NULL, startingDate DATE NOT NULL, endDate DATE NOT NULL, necessaryDocuments TEXT NOT NULL, outwardJourneyDate DATETIME NOT NULL, outwardJourneyLocation TEXT NOT NULL, outwardJourneyticket TEXT NOT NULL, returnJourneyDate DATETIME NOT NULL, returnJourneyLocation TEXT NOT NULL, returnJourneyticket TEXT NOT NULL, hotelName TEXT NOT NULL, checkInDate DATE NOT NULL, checkOutDate DATE NOT NULL, hotelLocation TEXT NOT NULL, attractions TEXT NOT NULL, restaurants TEXT NOT NULL, events TEXT NOT NULL, carPickUpDate DATETIME NOT NULL, carPickUpLocation TEXT NOT NULL, carReturnDate DATETIME NOT NULL, carReturnLocation TEXT NOT NULL, notes TEXT NOT NULL, PRIMARY KEY (`id`));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `students` was successful!");

    console.log("Closing...");
  });

  con.end();
});
