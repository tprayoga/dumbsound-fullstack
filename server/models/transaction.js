'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        transaction.belongsTo(models.premium,{
          as:"premium",
          foreignKey:{
            name:"idPremium"
          }
        })
        transaction.belongsTo(models.user,{
          as:"user",
          foreignKey:{
            name:"idBuyer"
          }
        })
    }
  }
  transaction.init({
    idPremium: DataTypes.INTEGER,
    idBuyer: DataTypes.INTEGER,
    price: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};