import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc  auth user
//@route POST /api/users/login
//@acess public
const authUser = asyncHandler(async (req, res) => {
  res.send("login user");
});

// @desc  register user
//@route POST /api/users
//@acess public
const registerUser = asyncHandler(async (req, res) => {
  res.send("registerUser");
});

// @desc  logout user clear cookies
//@route POST /api/users/logout
//@acess private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logoutUser");
});
// @desc  get user profile
//@route get /api/users/profile
//@acess private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("getUserProfile");
});

// @desc  get user profile
//@route PUT /api/users
//@acess private/Admin
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("updateUserProfile");
});

// @desc  get users
//@route PUT /api/users
//@acess private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("getUsers");
});
// @desc  get user by id
//@route PUT /api/users/:id
//@acess private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("getUserById");
});

// @desc  delete users
//@route delete /api/users/:id
//@acess private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("deleteUser");
});
// @desc  update user
//@route PUT /api/users/:id
//@acess private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("updateUser");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  updateUser,
  getUserById,
  deleteUser,
  updateUserProfile,
};
