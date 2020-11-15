const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ruleset extends Model {
    // Code here
  }

  Ruleset.init(
    {
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      cashback_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      redemptionLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      usedRedemptionLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      minTransactions: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      budget: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      usedBudget: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: 'Ruleset',
      tableName: 'rulesets',
    },
  );
  return Ruleset;
};
