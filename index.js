const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
var cors = require('cors');
require("dotenv").config();

app.use(express.json());

app.use(cors())

mongoose.connect(`${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log("Connected to database"),
    err => console.log("Connection Failed", err)
  );

const Routes = require("./routes/index");
app.use("/api", Routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const serveHost = process.env.YOUR_HOST || "0.0.0.0";

var server = app.listen(port, serveHost, () => {
  console.log(`Server running on ${port}`);
});


