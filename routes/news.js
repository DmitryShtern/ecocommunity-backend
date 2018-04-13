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

// console.log("url by royter: ")

let query = "SELECT * FROM news"

router.get("/", (req, res, next) => {
  console.log("req url: " + req.url)
  query += req.url.length > 1 ? " where " + req.url.substr(2) : ""
  next()
})

connection.query(query, (err, rows, fields) => {
  router.get("/", (req, res, next) => {
    // console.log("query " + query)
    res.json(rows)
  })

  // if (!err) console.log("!!!! News: ", rows)
  // else console.log("Error while performing Query.")
})

connection.end()

module.exports = router
