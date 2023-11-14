"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(user.password, salt, function(err, hash) {
                user.password  = hash
                console.log('check hash', hash )
              });
          });



          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );

User.prototype.isValidPassword = async function (userInputtedPassword, hashedPassword) {
  try {
    const result = await bcrypt.compare(userInputtedPassword, hashedPassword);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
  return User;
};
