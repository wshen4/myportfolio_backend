const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
var cors = require("cors");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/myportfolio")
  .then(() => console.log("Connecting to MongoDB..."))
  .catch(err => console.log("Could not connect ot MongoDB:\n" + err));

app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen("3000", () => console.log("Listening on port 3000..."));
