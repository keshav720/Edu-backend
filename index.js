require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const { db } = require("./src/models");
const indexRouter = require("./routes/api");
app.use(cors());
app.options("*", cors());

app.use(cors());
app.options("*", cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
 
app.use("/api", indexRouter);

// Routes
app.get("/", (req, res) => {
  res.send({ success: true, message: "Welcome to Educational Website!" });
});

// Sync sequelize models and then start express server
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
// proddb.sequelize
//   .sync()
//   .then(() => {
//     console.log("Synced prod db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync prod db: " + err);
//   });
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
