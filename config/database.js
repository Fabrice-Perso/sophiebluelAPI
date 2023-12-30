const mongoose = require("mongoose");
const dbConfig = require("./db.config");

mongoose
  .connect(dbConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));
