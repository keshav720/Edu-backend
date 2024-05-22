const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/db.Config");

// const sequelize = new Sequelize(
//   config.env.development.database,
//   config.env.development.username,
//   config.env.development.password,
//   {
//     host: config.env.development.host,
//     dialect: config.env.development.dialect,
//   }
// );
// console.log("sequelize---", sequelize.config);
// const sequelize = new Sequelize(
//   config.env.production.database,
//   config.env.production.username,
//   config.env.production.password,
//   {
//     host: config.env.production.host,
//     dialect: config.env.production.dialect,
//   }
// );
const sequelize = new Sequelize(
  config.env.production.database,
  config.env.production.username,
  config.env.production.password,
  {
    host: config.env.production.host,
    dialect: config.env.production.dialect,
  }
);
// const sequelizeProd = new Sequelize("eduapp", "rootroot", "root", {
//   host: "eduapp.c7iikiw0apqk.eu-north-1.rds.amazonaws.com",
//   dialect: "mysql",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
console.log("sequelizeProd---", sequelize.config);

// const db = {};
const db = {};

// db.sequelize = sequelize;
db.sequelize = sequelize;

db.User = require("./user/user.model.js")(sequelize, Sequelize);
db.Course = require("./courses/course.model.js")(sequelize, Sequelize);
db.CourseContent = require("./courses/courseContent.model.js")(
  sequelize,
  Sequelize
);
db.Test = require("./test/test.model.js")(sequelize, Sequelize);
db.Question = require("./test/question.model.js")(sequelize, Sequelize);
db.UserTest = require("./test/userTest.model.js")(sequelize, Sequelize);

db.SubscriptionPlan = require("./subscriptionPlan.model.js")(
  sequelize,
  Sequelize
);
db.UserSubscription = require("./userSubscription.model.js")(
  sequelize,
  Sequelize
);

db.Payment = require("./payment.model.js")(sequelize, Sequelize);

db.UserSubscription.belongsTo(db.User, {
  foreignKey: "userId",
  as: "User",
});
db.User.hasOne(db.UserSubscription, {
  foreignKey: "userId",
  as: "UserSubscription",
});
db.UserSubscription.belongsTo(db.SubscriptionPlan, {
  foreignKey: "subscriptionId",
  as: "SubscriptionPlan",
});
db.SubscriptionPlan.hasOne(db.UserSubscription, {
  foreignKey: "subscriptionId",
  as: "UserSubscription",
});
// Mapping course content with course
db.CourseContent.belongsTo(db.Course, {
  foreignKey: "courseId",
  as: "Course",
});
db.Course.hasMany(db.CourseContent, {
  foreignKey: "courseId",
  as: "CourseContent",
});

db.Payment.belongsTo(db.User, { foreignKey: "userId" });
db.User.belongsToMany(db.Course, { through: "UserCourses", as: "courses" });
db.Course.belongsToMany(db.User, { through: "UserCourses", as: "users" });

db.Test.belongsTo(db.Course, {
  foreignKey: "courseId",
  as: "Course",
});
db.Course.hasMany(db.Test, {
  foreignKey: "courseId",
  as: "Tests",
});

db.Question.belongsTo(db.Test, {
  foreignKey: "testId",
  as: "Test",
});
db.Test.hasMany(db.Question, {
  foreignKey: "testId",
  as: "Question",
});

db.UserTest.belongsTo(db.User, {
  foreignKey: "userId",
  as: "User",
});
db.User.hasMany(db.UserTest, {
  foreignKey: "userId",
  as: "UserTest",
});
db.UserTest.belongsTo(db.Test, {
  foreignKey: "testId",
  as: "Test",
});
db.Test.hasMany(db.UserTest, {
  foreignKey: "testId",
  as: "UserTest",
});


// db.CourseContent=require("./courses/courseContent.model.js")(sequelize,Sequelize);
// // Mapping course content with course
// db.Course.hasMany(db.CourseContent, {
//   foreignKey: "courseId",
//   as: "CourseContent",
// });
// db.CourseContent.belongsTo(db.Course, {
//   foreignKey: "courseId",
//   as: "Course",
// });
module.exports = { db };
