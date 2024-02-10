const nodemailer = require("nodemailer");
const readFileAsync = util.promisify(fs.readFile);
const VerificationCodes = {};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASSWORD
    }
});

function generateVerificationCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const EmailVerification = async (req, res, next) => {
  try {
    const HTML = await readFileAsync('./public/verifyEmail.html', 'utf8').replace('{{ CODE }}', code[req.ip]);
    const Email = req.params.email;
    const { db } = req.app.locals;
    const result = await db.collection('Members').findOne({ Email }, { projection: { Email: 1 } });
    if (result) {
        res.status(200).json({ response: true });
        return next();
    } else res.status(200).json({ err: "This email not exist" });
  } catch (error) {
    console.log(`The error from AuthController in EmailVerification(): ${error.message}`);
    res.json({ err: "An error in the server try later !" });
  }
};

const SendVerificationCode = async (req, res, next) => {
    try {
        const email = req.params.email;
        const verificationCode = generateVerificationCode();
        VerificationCodes[email] = verificationCode;
        transporter.sendMail();
    } catch (error) {
        console.log(`The error from AuthController in EmailVerification(): ${error.message}`);
        res.json({ err: "An error in the server try later !" });
    }
}

module.exports = { EmailVerification, SendVerificationCode };