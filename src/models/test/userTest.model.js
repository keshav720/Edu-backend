module.exports = (sequelize, Sequelize) => {
    const UserTest = sequelize.define(
      "UserTest",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        numberOfQuestions:{
            type:Sequelize.INTEGER,
            allowNull:false,
        }
      },
      {
        timestamps: true,
      }
    );
  
    return UserTest;
  };
  