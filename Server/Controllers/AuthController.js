const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const VerificationCodes = {};

function generateVerificationCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};


const login = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const { Email, Password } = req.body;
    const member = await db.collection('Members').findOne({ Email, Password }, { projection: { Password: 0 } });
    if (member !== null) {
      const accessToken = jwt.sign(member, process.env.JWT_KEY, { expiresIn: "10m" });
      res.cookie('auth', accessToken, {
        maxAge: 1000*60*10,
        httpOnly: true,
        path: '/',
        secure: false
      });
      res.status(200).json({ response: '/Account' });
    } else res.status(200).json({ err: "The email or password incorrect !" });
  } catch (error) {
    console.log(`The error from AuthController in login(): ${error.message}`);
    res.json({ err: 'An error in the server try later !' });
  }
};

const signUp = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const member = { ...req.body, Password: await bcrypt.hash(req.body.Password, 10) };
    await db.collection('Members').insertOne(member);
    const Token_Data = { ...member }; delete Token_Data.Password;
    const accessToken = jwt.sign(Token_Data, process.env.JWT_KEY, { expiresIn: "10m" });
    res.cookie('auth', accessToken, {
      maxAge: 1000*60*10,
      httpOnly: true,
      path: '/',
      secure: false
    });
    res.status(200).json({ response: '/verifyEmail' });
  } catch (error) {
    console.log(`The error from AuthController in signUp(): ${error.message}`);
    res.json({ err: 'An error in the server try later !' });
  }
}

const SendVerificationCode = async (req, res) => {
  try {
      const email = req.params.email;
      const verificationCode = generateVerificationCode();
      let HTML = await readFileAsync('./public/verifyEmail.html', 'utf8');

      VerificationCodes[email] = verificationCode;
      HTML = HTML.replace('{ Code }', verificationCode);

      const transporter = nodemailer.createTransport({
          service: "Gmail",
          secure: true,
          auth: {
              user: process.env.MAIL_SENDER,
              pass: process.env.MAIL_PASSWORD
          }
      });

      await transporter.sendMail({
          from: process.env.MAIL_SENDER,
          to: email,
          subject: 'Chat App email verification',
          html: HTML
      });
  } catch (error) {
    console.log(`The error from AuthController in SendVerificationCode(): ${error.message}`);
    res.json({ err: "An error in the server try later !" });
  }
}

const verfyCode = async (req, res) => {
  try {
    const { Email, Code } = req.body;
    console.log(VerificationCodes[Email]);
    if (VerificationCodes[Email] == Code) {
      delete VerificationCodes[Email];
      res.status(200).json({ response: true });
    }
    else res.status(200).json({ err: "The verification code incorrect" });
  } catch (error) {
    console.log(`The error from AuthController in verfyCode(): ${error.message}`);
    res.json({ err: "An error in the server try later !" });
  }
};

const UpdatePassword = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const { Email, Password } = req.body;
    await db.collection('Members').updateOne({ Email }, { $set: { Password: await bcrypt.hash(Password, 10) } });
    res.status(200).json({ response: "/" });
  } catch (error) {
    console.log(`The error from AuthController in UpdatePassword(): ${error.message}`);
    res.json({ err: "An error in the server try later !" });
  }
}

module.exports = { login, signUp, SendVerificationCode, verfyCode, UpdatePassword };