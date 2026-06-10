const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {auth, isAdmin, isStudent} = require("../middlerwares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        sucess: true,
        message: "Welcome to the protected route for STUDENT."
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for ADMIN."
    });
});

router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for TEST."
    });
});

module.exports = router;