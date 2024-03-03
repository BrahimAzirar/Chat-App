const ex = require("express");
const FriendsRequestsController = require("../Controllers/FriendsRequestsController");

const FriendsRequests = ex.Router();

FriendsRequests.get("/sendFriendRequest/:TargetMember", FriendsRequestsController.SendFriendRequest);
FriendsRequests.get("/seeFriendsRequests", FriendsRequestsController.SeeFriendsRequests);

module.exports = { FriendsRequests };