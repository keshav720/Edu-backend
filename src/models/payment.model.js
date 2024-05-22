module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define(
      "Payment",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        totalAmount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return Payment;
  };
  