module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      questionText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      optionA: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      optionB: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      optionC: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      optionD: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correctOption: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
  );

  return Question;
};
