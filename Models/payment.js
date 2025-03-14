const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../Config/database");
const Booking = require("./booking");

const Payment = sequelize.define("Payment", { //Basically building out the attributes of the payment profile
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bookingId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Booking,
            key: "id",
        },
    },
    reference:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM("Pending", "Successful", "Failed"),
        defaultValue: "Pending",
    },
});

module.exports = Payment;