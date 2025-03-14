const axios = require("axios");
const Booking = require("../Models/booking")
const Payment = require ("../Models/payment")

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

//Create newPayment 
exports.initiatePayment = async (req, res)=>{


    try{
        const {bookingId, email, amount} = req.body;
        const userId = req.user.id;

        //Checking if booking exists
        const booking = await Booking.findOne ({ where: {id: bookingId, userId}});
        if (!booking){
                return res.status(404).json({ message: "Booking not found" });
        }

        //Generate Unique reference ID
        const reference = `pay_${Date.now()}`;

        //store payment in DB 
        await Payment.create({
            bookingId,
            reference,
            amount,
            status: "Pending",
        });

        //Call Paystack to create API
        const response = await axios.post(
            `${PAYSTACK_BASE_URL}/transaction/initialize`,
            {
                email,
                amount: amount * 100,
                reference,
                callback_url: `http://localhost:8080/api/payments/verify/${reference}`,
                metadata: {bookingId},
            },
            {
                headers:{
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.status(200).json({message: "Payment initiated", data: response.data})
    } catch(error){
        res.status(500).json({message:"Error initiating payment", error: error.message});
    }
};


//Verify Payment 
exports.verifyPayment = async (req, res)=>{

    try{
        const { reference } = req.params;
        

        //Callback Paystack API to verify transactions
        const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,{
            headers:{ Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`},
        });

        const paymentData = response.data.data;

        if (paymentData.status === "success"){
            //Update payment record
            await Payment.update({status: "Successful"},{where:{reference}});

            //Update the booking status
            await Booking.update({status: "Paid"},{where: {id: paymentData.metadata.bookingId}});

            return res.status(200).json({message:"Payment verfied successfully", paymentData});
        }else{
            await Payment.update({status: "Failed"}, { where: {reference}} );
            return res.status(400).json({message:"Payment Failed", paymentData});
        };
    } catch(error){
        res.status(500).json({message:"Error verifiying payment", error: error.message});
    }
};