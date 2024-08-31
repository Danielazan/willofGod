const {Model, DataTypes } = require("sequelize")

const sequelize = require("../database")

class User extends Model{}

User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Branch:{
      type: DataTypes.STRING,
      allowNull: false
    },
    access:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    }
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true
  })
  
  module.exports = User;
3