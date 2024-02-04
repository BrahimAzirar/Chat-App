const Collection = require("../server");

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const member = await Collection.findOne({ Email, Password }).toArray();
    console.log(member);
  } catch (error) {
    console.log(`The error from AuthController in login(): ${error.message}`);
  }
};


module.exports = { login };