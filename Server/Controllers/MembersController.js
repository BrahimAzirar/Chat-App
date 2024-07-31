const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const getMembers = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const { auth } = req.cookies;
    const membersPerPage = 10;
    const pageNumber = parseInt(req.query.page) || 1;
    const memberSkip = (pageNumber - 1) * membersPerPage;
    const { _id, FriendsRequests } = await jwt.verify(auth, process.env.JWT_KEY);

    const members = await db.collection('Members')
      .find({ $and: [
        { _id: { $ne: new ObjectId(_id) } },
        { _id: { $nin: FriendsRequests.map(ele => new ObjectId(ele)) } }
      ] }, {
        projection: {
          FirstName: 1,
          LastName: 1,
          Photo: 1,
          _id: 1
        }
      })
      .skip(memberSkip)
      .limit(membersPerPage)
      .toArray();

    res.status(200).json({ response: members });
  } catch (error) {
    console.log(`The error from MembersController in getMembers(): ${error.message}`);
    res.json({ err: "An error occurred on the server. Please try again later." });
  }
};


const addMembers = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const count = 1000;
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const data = [];

    function SliceAlpha() {
      const start = parseInt(Math.random() * (alpha.length - 5));
      const end = start + 4;

      return alpha.slice(start, end);
    };

    for (let index = 0; index < count; index++) {
      const FirstName = SliceAlpha();
      const LastName = SliceAlpha();
      const Email = `${FirstName}_${LastName}@gmail.com`;
      const Password = await bcrypt.hash(SliceAlpha(), 10);
      const Email_Verified = false;

      data.push({
        FirstName, 
        LastName, 
        Email, 
        Password, 
        Email_Verified,
        FriendsRequests: [],
        Friends: [],
        BlockedFriends: [],
        Chat: [],
        Notifications: []
      });
    };

    await db.collection('Members').insertMany(data);
    res.status(200).json({ response: data });
  } catch (error) {
    console.log(`The error from MembersController in addMembers(): ${error.message}`);
    res.json({ err: "An error in the server try later !" });
  }
}

module.exports = { getMembers, addMembers };