const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // Define association here
      Customer.hasMany(models.Transaction, {
        foreignKey: 'customerId',
        as: 'transactions',
      });
    }
  }

  Customer.init(
    {
      customer_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'customers',
    },
  );

  return Customer;
};
