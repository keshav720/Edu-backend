// models/course.js
module.exports = (sequelize, Sequelize) => {
    const CourseContent = sequelize.define(
      "CourseContent",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING, 
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return CourseContent;
  };
  