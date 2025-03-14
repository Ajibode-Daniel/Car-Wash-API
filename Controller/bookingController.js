
const Booking = require("../Models/booking");

//create a newBooking
exports.createBooking = async(req,res)=>{
    const {carType, servicePackage, date, time } = req.body; //Information needed to created booking
    const userId = req.user.id; //Get user ID from authenticated token so as to match booking to user

    try{
        const booking = await Booking.create({
            userId,
            carType,
            servicePackage,
            date,
            time,
        });

        res.status(201).json({message:"Booking created successfully", booking});
    }catch (error){
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

//this is to getUserBooking 
exports.getUserBookings = async(req,res)=>{


    try{
        const userId = req.user.id;
        const bookings = await Booking.findAll({ where: { userId } });

        res.status(200).json({ bookings });
    }catch (error){
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

//cancel a booking
exports.cancelBooking = async(req,res)=>{

try{
       const userId = req.user.id;
       const bookingId = parseInt(req.params.id);

       const booking = await Booking.findOne({ where: {id: bookingId, userId}});
       if(!booking){
        return res.status(404).json({message: "Booking not found"});
       }

       booking.status = "Cancelled";
       await booking.save();

       res.status(200).json({message:"Booking cancelled successfully", booking});
}catch (error){
    res.status(500).json({message: 'Server error', error: error.message});
};
}