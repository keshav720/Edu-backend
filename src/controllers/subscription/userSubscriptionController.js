const { db } = require("../../models");
const { Op } = require("sequelize");
const UserSubscription = db.UserSubscription;

// Create User Subscription
exports.createUserSubscription = async (req, res) => {
  try {
    const { userId, subscriptionId, maxCourses } = req.body;
    const availableCourses = maxCourses || 5;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 6);
    const newUserSubscription = await UserSubscription.create({
      startDate,
      endDate,
      userId,
      subscriptionId,
      availableCourses,
    });
    res.status(201).json({
      success: true,
      message: "User subscription created successfully",
      newUserSubscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Subscription Plan By UserId
exports.getUserSubscriptionPlanByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the current subscription plan based on the current date
    const currentDate = new Date();
    const subscriptionPlan = await UserSubscription.findOne({
      where: {
        userId: userId,
        startDate: { [Op.lte]: currentDate },
        endDate: { [Op.gte]: currentDate },
      },
    });

    res.status(200).json({
      success: true,
      message: " subscription plan found successfully",
      subscriptionPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update User Subscription Plan By Decreasing Available Courses by 1
exports.decreaseAvailableCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the current subscription plan based on the current date
    const currentDate = new Date();
    const subscriptionPlan = await UserSubscription.findOne({
      where: {
        userId: userId,
        startDate: { [Op.lte]: currentDate },
        endDate: { [Op.gte]: currentDate },
      },
    });

    if (!subscriptionPlan) {
      return res.status(404).json({
        success: false,
        message: "Current subscription plan not found",
      });
    }

    // Check if availableCourses is greater than 0 before decreasing
    if (subscriptionPlan.availableCourses <= 0) {
      return res.status(400).json({
        success: false,
        message: "No available courses left to decrease",
      });
    }

    // Decrease availableCourses by 1
    subscriptionPlan.availableCourses -= 1;
    await subscriptionPlan.save();

    res.status(200).json({
      success: true,
      message: "Available courses decreased by 1 successfully",
      subscriptionPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.increaseAvailableCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { maxCourses, subscriptionId } = req.body;
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 6); // Adding 6 months to the start date

    const subscriptionPlan = await UserSubscription.findOne({
      where: {
        userId: userId,
        subscriptionId: subscriptionId,
      },
    });

    if (!subscriptionPlan) {
      return res.status(404).json({
        success: false,
        message: "Current subscription plan not found",
      });
    }

    // Decrease availableCourses by 1
    subscriptionPlan.availableCourses += maxCourses;
    subscriptionPlan.endDate = new Date(currentDate);

    await subscriptionPlan.save();

    res.status(200).json({
      success: true,
      message: "Available courses increase  successfully",
      subscriptionPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
