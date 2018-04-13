var mysql = require("mysql")
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecocommunity",
  timezone: "UTC",
})

connection.connect()

var express = require("express")
var router = express.Router()

connection.query("SELECT * from album", function(err, rows, fields) {
  router.get("/", function(req, res, next) {
    res.json(rows)
  })

  // if (!err) console.log("!!!! Album: ", rows)
  // else console.log("Error while performing Query.")
}),
  connection.end()

module.exports = router
