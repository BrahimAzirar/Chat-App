 
const ex = require("express");
const MembersController = require("../Controllers/MembersController");

const members = ex.Router();

members.get('/getMembers', MembersController.getMembers);
// members.get('/addMembers', MembersController.addMembers);

module.exports = { members };
