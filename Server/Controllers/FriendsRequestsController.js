const { ObjectId } = require("mongodb");

const SendFriendRequest = async (req, res) => {
  try {
      const { db } = req.app.locals;
      let { MemberId, TargetMember } = req.body;

      const targetMember = new ObjectId(TargetMember);

      await db.collection("Members").updateOne(
          { _id: targetMember },
          { $push: { FriendsRequests: MemberId } }
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
  } catch (error) {
    console.log(
      `The error from FriendsRequestsController in SeeFriendsRequests(): ${error.message}`
  );
  res.json({
      err: "An error occurred on the server. Please try again later.",
  });
  }
}

module.exports = { SendFriendRequest, SeeFriendsRequests };
