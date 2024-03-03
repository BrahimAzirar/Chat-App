const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const SendFriendRequest = async (req, res) => {
  try {
      const { db } = req.app.locals;
      const TargetMember = req.params.TargetMember;
      const MemberId = await jwt.verify(req.cookies.auth, process.env.JWT_KEY)._id;

      const targetMember = new ObjectId(TargetMember);
      const memberId = new ObjectId(MemberId);

      await db.collection("Members").updateOne(
          { _id: targetMember },
          { $push: { FriendsRequests: memberId } }
      );

      res.status(200).json({ response: true });
  } catch (error) {
      console.log(
          `The error from FriendsRequestsController in SendFriendRequest(): ${error.message}`
      );
      res.json({
          err: "An error occurred on the server. Please try again later.",
      });
  }
};

const SeeFriendsRequests = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const MemberId = new ObjectId((await jwt.verify(req.cookies.auth, process.env.JWT_KEY))._id);

    const friendsRequests = await db.collection("Members").aggregate([
      { $match: { _id: MemberId } },
      { $lookup: { from: "Members", localField: "FriendsRequests", foreignField: "_id", as: "friends" } },
      { $unwind: "$friends" },
      { $project: { "friends._id": 1, "friends.Profile": { $ifNull: ["$friends.Profile", null] }, "friends.FirstName": 1, "friends.LastName": 1 } }
    ]).toArray();

    res.status(200).json({ response: friendsRequests });
  } catch (error) {
    console.log(`The error from FriendsRequestsController in SeeFriendsRequests(): ${error.message}`);
    res.status(500).json({ err: "An error occurred on the server. Please try again later." });
  }
};

module.exports = { SendFriendRequest, SeeFriendsRequests };
