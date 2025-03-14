const {Sequelize, DataTypes } = require ("sequelize");
const sequelize = require("../Config/database");
const User = require("./user")

const Booking = sequelize.define ("Booking", {
    id: { //Unique ID for each booking 
      type: DataTypes.INTEGER,  
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, // For type checking
      allowNull: false,
      references:{
        model: User,
        key: "id",
      },
    },
    carType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    servicePackage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true, //will need phone number since it's easier to call users to check in on their
    },
    time:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{
        type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled"),
        defaultValue: "Pending",
    }
  });
  
  Booking.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE"});
  User.hasMany(Booking,{ foreignKey: "userId"});
  
  module.exports = Booking;