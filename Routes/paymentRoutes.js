const express = require("express");
const {initiatePayment, verifyPayment}= require("../Controller/paymentController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/initiate", authMiddleware, initiatePayment);
router.get("/verify/:reference", authMiddleware, verifyPayment);

module.exports = router;