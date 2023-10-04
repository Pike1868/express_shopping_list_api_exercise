const express = require("express");
const ExpressError = require("./expressError");
const morgan = require("morgan");
const path = require("path");
const { logger } = require("./middleware");
const itemsRoutes = require("./routes/itemsRoutes");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use("/items", itemsRoutes);

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve("index.html"));
});

//404 handler
app.use((req, res) => {
  return new ExpressError("Not Found", 404);
});

//global error handler
app.use((err, req, res, next) => {
  //default status is 500, Internal Server error
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
