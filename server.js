const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("db connection successful");
});

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV == "production") {
  console.log('process.env.NODE_ENV == "production"');
  app.use(express.static("client/build"));
}

app.use("/api", routes);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
