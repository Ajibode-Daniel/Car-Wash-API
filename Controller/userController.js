const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const { user } = require("pg/lib/defaults");


//Registering New Users to the Web App
exports.registerUser = async (req,res)=>{
    const {name,email, password, phone } = req.body; //This is all the infomation the req body is expecting during registration
    

    //Check if the user has registered before,  via email checking
    try {
        const userExists = await User.findOne({where:{email}});
        if (userExists) return res.status(400).json({message: " User already exists, try a different email"});


        //hashpassword so it is safely secured
        const hashedPassword = await bcryptjs.hash(password,10);
        const user = await User.create({ name, email, password: hashedPassword, phone });
        res.status(201).json({ message: "User registered successfully", user });

        //Error incase new users can't register for some reason
    } catch (error){
        res.status(500).json({message: 'Server error', error});
    }
};


//Login for Users
exports.loginUser = async (req,res) => {
    const {email, password} = req.body;

   //This is to validate email & password
    try {
        const user = await User.findOne({where: {email} });
        if (!user) return res.status(400).json({message: "email is incorrect"});

       const isMatch = await bcryptjs.compare(password, user.password);
       if (!isMatch) return res.status(401).json({message: "Incorrect Password"});

       const token = jwt.sign({
        id: user.id,
        email: user.email
       }, process.env.JWT_SECRET, {expiresIn: "1d"}); //This makes the user auto log out
       
       
       res.status(200).json({message:"Login successful", token, user});
    } catch(error){
        res.status(500).json({message: "Server error", error});
    }
};