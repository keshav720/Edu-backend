const express = require("express");
const router = express.Router();
const courseController = require("../../../src/controllers/courses/courseController");
const multer = require("multer");
const upload = multer({ dest: "../../../images" });

const {
  authenticateUser,
  authorizeUser,
} = require("../../../src/middlewares/jwtAuth");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

router.post(
  "/",
  // authenticateUser,
  // authorizeUser(["admin"]),
  courseController.createCourse
);
router.put(
  "/:id",
  // authenticateUser,
  // authorizeUser(["admin"]),
  courseController.updateCourse
);
router.delete(
  "/:id",
  // authenticateUser,
  // authorizeUser(["admin"]),
  courseController.deleteCourse
);

module.exports = router;
