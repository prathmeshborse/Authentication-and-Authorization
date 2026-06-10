const bcrypt = require("bcrypt");
const User = require("../models/User"); 
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.registerUser = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User with given already exists", success: false });
        }

        // Hash the password 10 is the salt rounds, which determines how secure the hash will be. Higher rounds means more security but also more time to compute.
        const hashedPassword = await bcrypt.hash(password, 10); 
        
        // Create new user
        const newUser = new User({name, email, password: hashedPassword, role: role || 'visitor' });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", success: true });
    }
    catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error", success: false  });
    }
};


// Login user
exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }
        
        // Generate JWT token
        const payload = { userId: user._id, role: user.role, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 

        // httpOnly: true means the cookie cannot be accessed via JavaScript, which helps prevent XSS attacks.
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        }
        
        res.cookie("token", token, cookieOptions);
        res.status(200).json({
            message: "Login successful",
            success: true,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    }
    catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error", success: false  });
    }
}