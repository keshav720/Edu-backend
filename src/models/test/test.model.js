module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define(
      "Test",
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
      },
      {
        timestamps: true,
      }
    );
  
    return Test;
  };
  