const { db } = require("../../models");
const SubscriptionPlan = db.SubscriptionPlan;

// Controller to get all subscription plans
exports.getAllSubscriptionPlans = async (req, res) => {
  try {
    const subscriptionPlans = await SubscriptionPlan.findAll();
    res.status(201).json({
      success: true,
      message: "All subscription Plans fetched successfully",
      subscriptionPlans,
    });
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSubscriptionPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriptionPlan = await SubscriptionPlan.findByPk(id);
    if (!subscriptionPlan) {
      res
        .status(404)
        .json({ success: false, message: "subscriptionPlan not found" });
    } else {
      res.status(201).json({
        success: true,
        message: "subscriptionPlan found successfully",
        subscriptionPlan,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Controller to create a new subscription plan
exports.createSubscriptionPlan = async (req, res) => {
  try {
    const { name, description, price, durationMonths, maxCourses } = req.body;
    console.log("in create subscription plan --", req.body);
    const newSubscriptionPlan = await SubscriptionPlan.create({
      name,
      description,
      price,
      durationMonths,
      maxCourses,
    });
    res.status(201).json({
      success: true,
      message: "subscription plan created successfully",
      newSubscriptionPlan,
    });
  } catch (error) {
    console.error("Error creating subscription plan:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Controller to update an existing subscription plan
exports.updateSubscriptionPlan = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, durationMonth, maxCourse } = req.body;
  try {
    const subscriptionPlan = await db.SubscriptionPlan.findByPk(id);
    if (!subscriptionPlan) {
      return res
        .status(404)
        .json({ success: false, error: "Subscription plan not found" });
    }
    await subscriptionPlan.update({
      name,
      description,
      price,
      durationMonth,
      maxCourse,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating subscription plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a subscription plan
exports.deleteSubscriptionPlan = async (req, res) => {
  const { id } = req.params;
  try {
    const subscriptionPlan = await db.SubscriptionPlan.findByPk(id);
    if (!subscriptionPlan) {
      return res.status(404).json({ error: "Subscription plan not found" });
    }
    await subscriptionPlan.destroy();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting subscription plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
