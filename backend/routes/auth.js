const express = require("express");
const router = express.Router();
const User = require("../models/User");
const EmailValidation = require("../models/EmailValidation");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require('dotenv').config();

// Package for encrypting the password
const bcrypt = require("bcryptjs");

// Package for creating JWT
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleWare/fetchUser.js");

// Secret String to create JWT Signature
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const nodemailer_user= process.env.REACT_APP_nodemailer_user;
const nodemailer_password= process.env.REACT_APP_password;


//Route1: Create a user using: POST "/api/auth/createuser". No login required
router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }), //Value after the comma will appear if the name is not valid
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {

    // Validating the request body as per the above conditions
    const errors = validationResult(req);
    let result = false;
    
    // If the validation holds false, errors will contain an array with the desciption of error
    if (!errors.isEmpty()) {
      return res.status(400).json({ result, msg: errors.array() });
    }

    try {

      // Checking whether the entered email already exists in database
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ msg: "This email already exists. Enter a different email."});
      }

      // Create a salt and add Salt added Hash out of the entered Password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create and insert User into Database
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      });

      // User ID to uniquely Identify the user
      const data = {
        user: {
          id: user.id,
        },
      };

      // Create a authentication token, first argument is data/payload and second is Secret String for Signature
      const authToken = jwt.sign(data, JWT_SECRET);
      
      result = true;
      // console.log("Success! Authentication Token is: "+ authToken);
      res.status(200).send({ msg: authToken});
    }catch (error) {
      // console.error("Error: "+ error.message);
      res.status(400).json({ msg: error.message});
    }
  }
);

//Route2: Authenticate the user using: POST "/api/auth/login"
router.post("/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Email entered by the user should exit in database
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({msg: "Please try to login with correct credentials.",});
      }

      //Check whether entered password by the user is correct
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({msg: "Please try to login with correct credentials."});
      }

      // User ID to uniquely Identify the user
      const data = {
        user: {
          id: user.id,
        },
      };

      // Create a authentication token, first argument is data/payload and second is Secret String for Signature
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(`Success! User ${email} logged in: ` + authToken);
      res.status(200).json({msg:authToken });
    } catch (error) {
      // console.log(error);
      res.status(500).json({msg: "Internal Server Error" });
    }
  }
);

//Get loggedin user details using: POST "/api/auth/getuser". Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: nodemailer_user,
    pass: nodemailer_password
  }
});

// Endpoint to request OTP
router.post("/request-otp", async (req, res) => {
  const email = req.body.email;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const expiry = Date.now() + 300000; // OTP expires in 5 minutes

  // Save OTP and expiry to database 
  let EmailVerificationDetails = await EmailValidation.create({
    email: email,
    OTP: otp,
    expiry: expiry,
  });

  // Send email
  const mailOptions = {
    from: nodemailer_user,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).json({msg: error});
    }
    // console.log(`OTP: ${otp} sent successfully for email: ${email}`);
    res.status(200).json({msg: `OTP is ${otp}`});
  });
});

// Endpoint to Delete OTP from DB
router.post("/delete-otp", async (req,res)=>{
    try {
        const email= req.body.email;
        let record= await EmailValidation.deleteMany({email: email})
        res.status(200).json({msg: `Record for Email: ${email} is deleted`});
    } catch (error) {
        res.status(400).json({msg: error.message})
    } 
})

// Endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    // Verify OTP from database 
    let emailValidationRecord = await EmailValidation.findOne({ email }).sort({ _id: -1 }); // It is to be found the recently added                                                       
    const isValid = (otp === emailValidationRecord.OTP);

    if (isValid) {
      res.status(200).json({msg: `OTP verified for ${email}`});
    } else {
      res.status(400).json({msg: 'Invalid OTP'});
    }
  });

//Update Password
router.post('/update-password', async(req, res)=>{
    const email= req.body.email;
    const password= req.body.password;
    // Create a salt and add Salt added Hash out of the entered Password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    try{
        const result= await User.updateOne({email: email}, {password: secPass})
        res.status(200).json({msg: result})
    }catch(error){
        res.status(400).json({msg: error.message})
    }
})

module.exports = router;
