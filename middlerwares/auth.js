const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        const decoded = jwt.verify( token, process.env.JWT_SECRET );
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// Autherizing Student
exports.isStudent = (req, res, next) => {
    if (req.user.role !== "student") {
        return res.status(401).json({
            success: false,
            message: "Only students can access this route"
        });
    }

    next();
};


// Autherizing Admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({
            success: false,
            message: "Only admins can access this route"
        });
    }

    next();
};