const express = require ("express");
const dotenv = require ("dotenv");
const cors = require ("cors");
const sequelize = require("./Config/database");
const userRoutes = require ("./Routes/userRoutes");
const Booking = require("./Models/booking");
const bookingRoutes = require("./Routes/bookingRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");



// const path = require ("path")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//Adding userRoutes to the server
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes)
// app.use(express.json())


//Sync database & get server started

const PORT = process.env.PORT || 5000;
sequelize.sync().then(()=>{
    console.log("Database Synced successfully!");
app.listen(PORT, ()=>
    console.log(`Server is running at Port ${PORT}`));
}).catch(err=> console.error("Database sync error: ", err));