const express = require("express");
const router = express.Router();
const courseContentController = require("../../../src/controllers/courses/courseContentController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../../src/middlewares/jwtAuth");

router.get("/:courseId", courseContentController.getCourseContentByCourseId);
// router.get("/:id",  courseContentController.getCourseContentById);

router.post(
  "/",
  // authenticateUser,
  // authorizeUser(["admin"]),
  courseContentController.createCourseContent
);
// router.put(
//   "/:id",
//   // authenticateUser,
//   // authorizeUser(["admin"]),
//   courseContentController.updateCourseContent
// );
// router.delete(
//   "/:id",
//   // authenticateUser,
//   // authorizeUser(["admin"]),
//   courseContentController.deleteCourseContent
// );

module.exports = router;
