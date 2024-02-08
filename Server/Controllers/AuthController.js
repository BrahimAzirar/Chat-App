const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");


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
    await db.collection('Members').insertOne(req.body);
    const Token_Data = { ...req.body }; delete Token_Data.Password;
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

module.exports = { login, signUp };