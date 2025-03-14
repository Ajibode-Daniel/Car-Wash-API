const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // For type checking
    allowNull: false, //This is so the space is never empty
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, //I've got to find a way to check if the emails are valid without having to finish the process first but might not matter
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, //will need phone number since it's easier to call users to check in on their
  },
}, {
    timestamps: true
});

module.exports = User;