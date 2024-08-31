const {Model, DataTypes } = require("sequelize")

const sequelize = require("../database")

class  Branch extends Model{}


 Branch.init({
      BranchName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Branchs' // Set the model name
    });






module.exports = {Branch};
