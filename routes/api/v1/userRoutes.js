const express = require("express");
const router = express.Router();
const authController = require("../../../src/controllers/users/authController");

router.post("/signup",  authController.signupUser );
router.post("/login", authController.loginUser );
router.post("/:userId/courses/:courseId",authController.updateUserCourses);
router.get("/:userId/courses",authController.getUserCourses);
module.exports = router; 
