const ex = require('express');
const AuthController = require("../Controllers/AuthController");

const auth = ex.Router();

auth.post("/login", AuthController.login);
auth.post("/signUp", AuthController.signUp);

module.exports = { auth };