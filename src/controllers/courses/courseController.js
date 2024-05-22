const { db } = require("../../models");
const multer = require("multer");
const fs = require("fs");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: "us-east-1",
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "eduimages1234",
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
}).single("image");
const Course = db.Course;
const createCourse = async (req, res) => {
  try {
    console.log("we are outside upload functionreq---");
    upload(req, res, async (err) => {
      // console.log("req---28", req);
      if (err) {
        console.error("error---", err.message);
        return res.status(500).json({ message: "Error uploading file" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
      }

      const { title, description } = req.body;
      const images = req.file;
      console.log("------------req----", req.body, req.file);
      // Create course with image URL
      const image = images.location;

      const course = await Course.create({ title, description, image });

      // Send response
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(201).json({
      success: true,
      message: "All courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ success: false, message: "Course not found" });
    } else {
      res.status(201).json({
        success: true,
        message: "Course found successfully",
        course,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.image; // Access uploaded image from req.file

    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    } else {
      const updateObject = {};
      if (title) updateObject.title = title;
      if (description) updateObject.description = description;
      if (image) {
        // Upload new image to S3
        const params = {
          Bucket: "eduimages1234",
          Key: image.originalname,
          Body: fs.createReadStream(image.path),
        };

        const uploadedFile = await s3.upload(params).promise();
        updateObject.imageUrl = uploadedFile.Location;
      }

      // Update the course with the constructed update object
      const updated_course = await course.update(updateObject);

      res.status(201).json({
        success: true,
        message: "Course updated successfully",
        updated_course,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      await course.destroy();
      res.json({ message: "Course deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserCourses = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const user = await db.User.findByPk(userId);
    const course = await db.Course.findByPk(courseId);
    if (!user || !course) {
      return res
        .status(404)
        .json({ success: false, message: "User or course not found" });
    }
    await user.courseId.push(courseId);

    return res
      .status(200)
      .json({ success: true, message: "Course added to user successfully" });
  } catch (error) {
    console.error("Error adding course to user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  updateUserCourses,
};
