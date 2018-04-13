var mysql = require("mysql")
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecocommunity",
  timezone: "UTC",
})

var createError = require("http-errors")
var express = require("express")
var router = express.Router()
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var indexRouter = require("./routes/index")
var albumRouter = require("./routes/album")
var newsRouter = require("./routes/news")
var photoRouter = require("./routes/photo")
var serviceRouter = require("./routes/service")
var tagRouter = require("./routes/tag")

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/album", albumRouter)
app.use("/news", newsRouter)
app.get("/article/:id", (req, res) => {
  console.log(req.originalUrl)

  connection.query("SELECT * FROM news WHERE id = " + req.params.id + "", (err, rows, fields) => {
    res.json(rows)
  })
})

// app.use("/news", (req, res, next) => {
//   connection.connect()

//   const query = req.originalUrl
//   console.log("query: " + query)

//   connection.query("SELECT * from news", (err, rows, fields) => {
//     router.get("/", (req, res, next) => {
//       // console.log("req url: " + req.url)
//       res.json(rows)
//     })

//     if (!err) console.log("!!!! News: ", rows)
//     else console.log("Error while performing Query.")
//   }),
//     connection.end()
// })
app.use("/photo", photoRouter)
app.use("/service", serviceRouter)
app.use("/tag", tagRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
