const express = require("express");
const router = express.Router();
const indexRouter = require("./v1/index.js");



router.use("/v1", indexRouter);



module.exports = router;
