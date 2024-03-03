const ex = require("express");
const FriendsRequestsController = require("../Controllers/FriendsRequestsController");

const FriendsRequests = ex.Router();

FriendsRequests.post("/sendFriendRequest", FriendsRequestsController.SendFriendRequest);

module.exports = { FriendsRequests };