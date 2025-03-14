const express = require ("express");
const {createBooking, getUserBookings,cancelBooking} = require("../Controller/bookingController")
const authMiddleware = require("../Middlewares/authMiddleware"); //Protect Routes
const { post } = require("./userRoutes");

const router = express.Router();

router.post("/", authMiddleware, createBooking); //Create a Booking
router.get("/", authMiddleware, getUserBookings); //Get list of bookings
router.delete("/:id", authMiddleware, cancelBooking) //Cancel a booking
// router.delete("/", authMiddleware, cancelBooking)


module.exports = router;