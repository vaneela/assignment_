const express = require("express");
const { GetUserHandler, UpdateUserHandler, DeleteUserHandler, FollowUserHandler, UnFollowUserHandler, GetAllUsersHandler } = require("../controllers/UserController");
const UserRoute = express.Router();

UserRoute.get("/all",GetAllUsersHandler);
UserRoute.get("/:username",GetUserHandler);
UserRoute.put("/:id/follow",FollowUserHandler);
UserRoute.put("/update/:id",UpdateUserHandler);
UserRoute.delete("/delete",DeleteUserHandler);
UserRoute.put("/:id/unfollow",UnFollowUserHandler);

module.exports = UserRoute;
