module.exports = (sequelize, Sequelize) => {
  const UserSubscription = sequelize.define(
    "UserSubscription",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      availableCourses:{
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0,
      }
    },
    {
      timestamps: true,
    }
  );

  return UserSubscription;
};
