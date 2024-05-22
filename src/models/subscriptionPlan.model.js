module.exports = (sequelize, Sequelize) => {
    const SubscriptionPlan = sequelize.define(
        "SubscriptionPlan",
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            durationMonths: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            maxCourses: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );

    return SubscriptionPlan;
};