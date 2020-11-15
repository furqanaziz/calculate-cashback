module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rulesets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      startDate: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      endDate: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      cashback_amount: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      redemptionLimit: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      usedRedemptionLimit: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      minTransactions: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      budget: {
        allowNull: true,
        defaultValue: 0.0,
        type: Sequelize.FLOAT,
      },
      usedBudget: {
        allowNull: true,
        defaultValue: 0.0,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface /* , Sequelize */) => {
    await queryInterface.dropTable('Rulesets');
  },
};
