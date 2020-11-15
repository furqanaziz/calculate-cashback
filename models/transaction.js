const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer',
      });
    }
  }
  Transaction.init(
    {
      date: DataTypes.DATEONLY,
      customerId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
    },
  );
  return Transaction;
};
