const express = require("express");
const router = express.Router();
const userSubscriptionController = require("../../../src/controllers/subscription/userSubscriptionController");

router.post(
  "/",
  // authenticateUser,
  // authorizeUser(["admin"]),
  userSubscriptionController.createUserSubscription
);
router.get(
  "/:userId",
  userSubscriptionController.getUserSubscriptionPlanByUserId
);
router.put("/:userId", userSubscriptionController.decreaseAvailableCourses);
router.put(
  "/:userId/increase",
  userSubscriptionController.increaseAvailableCourses
);

module.exports = router;
