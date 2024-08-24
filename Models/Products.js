const {Model, DataTypes } = require("sequelize")

const sequelize = require("../database")

class  Product extends Model{}


 Product.init({
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ImagePath: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      Previous_Qty:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      NewQtyAdded:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Products' // Set the model name
    });






module.exports = {Product};
