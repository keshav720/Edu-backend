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
const CourseContent = db.CourseContent;
const createCourseContent = async (req, res) => {
  try {
    console.log("we are in course content");

    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading file" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
      }
      // console.log("we are in course content", req.body);
      const { title, description, courseId } = req.body;
      console.log("we are in course content", title, description, courseId);

      if (!courseId) {
        return res.status(401).json({ message: "Course Id not found" });
      }
      const images = req.file;
      const image = images.location;
      const courseContent = await CourseContent.create({
        title,
        description,
        image,
        courseId,
      });

      // Send response
      res.status(201).json({
        success: true,
        message: "Course content created successfully",
        courseContent,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCourseContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseContent = await CourseContent.findByPk(id);
    if (!courseContent) {
      res
        .status(404)
        .json({ success: false, message: "Course content not found" });
    } else {
      res.status(201).json({
        success: true,
        message: "Course content found successfully",
        courseContent,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getCourseContentByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    const courseContent = await CourseContent.findAll({ where: { courseId } });
    console.log("-----courseContent", courseContent);
    if (!courseContent) {
      res
        .status(404)
        .json({ success: false, message: "Course content not found" });
    } else {
      res.status(201).json({
        success: true,
        message: "Course content found successfully",
        courseContent,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateCourseContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.image; // Access uploaded image from req.file

    const courseContent = await CourseContent.findByPk(id);
    if (!courseContent) {
      res.status(404).json({
        success: false,
        message: "Course content not found",
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
      const updated_courseContent = await course.update(updateObject);

      res.status(201).json({
        success: true,
        message: "Course content updated successfully",
        updated_courseContent,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCourseContent = async (req, res) => {
  try {
    const { id } = req.params;
    const courseContent = await CourseContent.findByPk(id);
    if (!courseContent) {
      res.status(404).json({ message: "Coursecontent not found" });
    } else {
      await courseContent.destroy();
      res.json({ message: "Course content deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCourseContent,
  getCourseContentById,
  getCourseContentByCourseId,
  updateCourseContent,
  deleteCourseContent,
};
