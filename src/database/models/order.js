'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.State,{as:'states'});
      Order.belongsTo(models.User,{as:'users'});
      Order.belongsTo(models.Payment,{as:'payments'});
      Order.hasOne(models.Shipping,{
        as:'shippings',
        foreignKey:'orderId',
      })
      Order.hasMany(models.Orderdetail,{
        as:'orderDetails',
        foreignKey:'orderId',
      })
      
    }
  };
  Order.init({
    number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    paymentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};