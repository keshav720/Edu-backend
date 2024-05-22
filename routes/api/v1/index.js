const express = require("express");
const router = express.Router();
const authRouter = require("./userRoutes");
const courseRouter = require("./courseRoutes");
const courseContentRouter = require("./courseContentRoutes");
const paymentRouter = require("./paymentRoutes");
const subscriptionRouter = require("./subscriptionPlanRoutes");
const userSubscriptionRouter = require("./userSubscriptionRoutes");

router.use("/users", authRouter);
router.use("/courses", courseRouter);
router.use("/courseContent", courseContentRouter);
router.use("/payment", paymentRouter);
router.use("/subscription", subscriptionRouter);
router.use("/userSubscription", userSubscriptionRouter);
module.exports = router;
