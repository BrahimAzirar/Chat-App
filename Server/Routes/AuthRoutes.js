const ex = require('express');
const AuthController = require("../Controllers/AuthController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const auth = ex.Router();

/****************** Middlewares *********************/

auth.use("/verifyEmail/:email", AuthMiddleware.EmailVerification);
auth.use("/signUp", AuthMiddleware.EmailIsExist);


/****************** APIs *********************/

auth.post("/login", AuthController.login);
auth.post("/signUp", AuthController.signUp);
auth.get("/verifyEmail/:email", AuthController.SendVerificationCode);
auth.post("/verifyCode", AuthController.verfyCode);
auth.put("/UpdatePass", AuthController.UpdatePassword);
auth.get("/EmailIsValid/:email", AuthController.EmailIsValid);

module.exports = { auth };