// models/course.js
module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define(
      "Course",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
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
  
    return Course;
  };
  