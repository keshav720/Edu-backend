const bcrypt = require("bcrypt");
const { db } = require("../../models");
const User = db.User;
const Course = db.Course;
const jwt = require("jsonwebtoken");
const { Sequelize, Op } = require("sequelize");
const {
  isValidEmail,
  validatePassword,
} = require("../../utils/validationUtils");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Pease fill the required details" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      return res
        .status(400)
        .json({ success: false, message: passwordValidationMessage });
    }
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
    res.status(201).json({
      success: true,
      message: `${newUser.dataValues.name} created successfully!`,
      accessToken,
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`Attempted login with email: ${email}`);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credential!" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: `${user.dataValues.name} logged in successfully!`,
      accessToken,
      user,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Logout User API
const logoutUser = (req, res) => {
  try {
    res.clearCookie("accessToken");
    localStorage.removeItem("accessToken");

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
const updateUserCourses = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const users = await User.findByPk(userId);
    const courses = await Course.findByPk(courseId);
    console.log("details--", users, courses);
    if (!users || !courses) {
      return res.status(404)
      .json({ success: false, message: "User or course not found" });
    }
    console.log(users);
    await users.addCourse(courses);

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

const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, { include: "courses" });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const myCourses = user?.courses;
    res
      .status(200)
      .json({
        success: true,
        message: "get user courses successfully",
        myCourses,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  updateUserCourses,
  getUserCourses,
};
