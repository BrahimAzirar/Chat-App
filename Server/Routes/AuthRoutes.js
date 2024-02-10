const ex = require('express');
const AuthController = require("../Controllers/AuthController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const auth = ex.Router();

/****************** Middlewares *********************/

auth.use("/verifyEmail/:email", AuthMiddleware.EmailVerification);
auth.use("/verifyEmail/:email", AuthMiddleware.SendVerificationCode);


/****************** APIs *********************/

auth.post("/login", AuthController.login);
auth.post("/signUp", AuthController.signUp);
auth.get("/verifyEmail/:email");

module.exports = { auth };