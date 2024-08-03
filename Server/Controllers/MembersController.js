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
    const { _id } = await jwt.verify(auth, process.env.JWT_KEY);

    // Use aggregation pipeline to filter members in one query
    const members = await db.collection('Members').aggregate([
      { $match: { _id: new ObjectId(_id) } }, // Find the current user
      { $project: { FriendsRequests: 1, Friends: 1 } }, // Project only FriendsRequests and Friends
      {
        $lookup: {
          from: 'Members',
          let: { friendsRequests: '$FriendsRequests', friends: '$Friends' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ['$_id', new ObjectId(_id)] },
                    { $not: [{ $in: ['$_id', '$$friendsRequests'] }] }
                  ]
                }
              }
            },
            { $skip: memberSkip },
            { $limit: membersPerPage },
            { $project: { FirstName: 1, LastName: 1, Photo: 1, FriendsRequests: 1, Friends: 1 } }
          ],
          as: 'members'
        }
      },
      { $unwind: '$members' }, // Unwind the members array
      { $replaceRoot: { newRoot: '$members' } }, // Replace the root with members documents
      {
        $addFields: {
          SentFriendRequest: {
            $in: [new ObjectId(_id), '$FriendsRequests']
          },
          Friends: {
            $in: [new ObjectId(_id), '$Friends']
          }
        }
      },
      { $project: { FriendsRequests: 0 } } // Remove FriendsRequests from the result
    ]).toArray();

    res.status(200).json({ response: members });
  } catch (error) {
    console.log(`The error from MembersController in getMembers(): ${error.message}`);
    res.json({ err: "An error occurred on the server. Please try again later." });
  }
};

const SearchMembers = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const { search, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;
    
    const result = await db.collection("Members").find({
      $or: [
        { FirstName: { $regex: search, $options: 'i' } },
        { LastName: { $regex: search, $options: 'i' } } 
      ]
    }, {
      projection: {
        _id: 1,
        FirstName: 1,
        LastName: 1,
        Photo: 1
      }
    })
      .limit(limit)
      .skip(skip)
      .toArray();

    res.status(200).json({ response: result });
  } catch (error) {
    console.log(`The error from MembersController in SearchMembers(): ${error.message}`);
    res.json({ err: "An error occurred on the server. Please try again later." });
  }
}

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

module.exports = { getMembers, addMembers, SearchMembers };