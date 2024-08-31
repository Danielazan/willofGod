const {Model, DataTypes } = require("sequelize")

const sequelize = require("../database")

class  Customer extends Model{}


 Customer.init({
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Contact: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Items:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      TotalAmount:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      SoldBy:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
       BranchName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Customers' // Set the model name
    });






module.exports = {Customer};
