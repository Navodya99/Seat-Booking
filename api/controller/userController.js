import UsersModel from "../models/userModel.js";

export const UpdateUser = async (req, res, next) => {
  try {
    const updateUser = await UsersModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
export const GetAllUsers = async (req, res, next) => {
  try {
    const allusers = await UsersModel.find();
    res.status(200).json(allusers);
  } catch (error) {
    next(error);
  }
};
export const GetUser = async (req, res, next) => {
  try {
    const User = await UsersModel.findById(req.params.id);
    res.status(200).json(User);
  } catch (error) {
    next(error);
  }
};
export const DeleteBusUser = async (req, res, next) => {
  try {
    await UsersModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Route Deleted Sucsussfully!");
  } catch (error) {
    next(error);
  }
};
