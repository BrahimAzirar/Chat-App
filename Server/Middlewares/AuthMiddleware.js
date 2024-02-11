const EmailVerification = async (req, res, next) => {
  try {
    const Email = req.params.email;
    const { db } = req.app.locals;
    const result = await db.collection('Members').findOne({ Email }, { projection: { Email: 1 } });
    if (result) {
        res.status(200).json({ response: true });
        next();
    } else res.status(200).json({ err: "This email not exist" });
  } catch (error) {
    console.log(`The error from AuthMiddleware in EmailVerification(): ${error.message}`);
    res.json({ err: "An error in the server try later !" });
  }
};

module.exports = { EmailVerification };