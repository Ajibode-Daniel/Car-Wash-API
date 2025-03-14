const {Sequelize} = require("sequelize");


//Initializing sqlite database
const sequelize = new Sequelize({
    dialect:"sqlite",
    storage: "./database.sqlite", // SQLite database file (need to check it again)
    logging: false, // Did this to disable logging
})

module.exports = sequelize;
