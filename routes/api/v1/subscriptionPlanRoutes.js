const express = require("express");
const router = express.Router();
const subscriptionController = require("../../../src/controllers/subscription/subscriptionPlanController");

const {
  authenticateUser,
  authorizeUser,
} = require("../../../src/middlewares/jwtAuth");

router.get("/", subscriptionController.getAllSubscriptionPlans);
router.get("/:id", subscriptionController.getSubscriptionPlanById);

router.post(
  "/",
  // authenticateUser,
  // authorizeUser(["admin"]),
  subscriptionController.createSubscriptionPlan
);
router.put(
  "/:id",
  // authenticateUser,
  // authorizeUser(["admin"]),
  subscriptionController.updateSubscriptionPlan
);
router.delete(
  "/:id",
  // authenticateUser,
  // authorizeUser(["admin"]),
  subscriptionController.deleteSubscriptionPlan
);

module.exports = router;
