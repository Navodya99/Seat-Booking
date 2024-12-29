import UsersModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const RegisterController = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UsersModel({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (error) {
    next(error);
  }
};

export const LoginController = async (req, res, next) => {
  try {
    const user = await UsersModel.findOne({ userName: req.body.userName });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const { password, ...otherDetails } = user._doc;

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWTSECRET
    );

    res
      .cookie("Access_Token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails, isAdmin: user.isAdmin });
  } catch (error) {
    next(error);
  }
};
