import BusModel from "../models/busModel.js";

export const UpdateBus = async (req, res, next) => {
  try {
    const updateBus = await BusModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateBus);
  } catch (error) {
    next(error);
  }
};
export const GetAllUBus = async (req, res, next) => {
  try {
    const allBus = await BusModel.find();
    res.status(200).json(allBus);
  } catch (error) {
    next(error);
  }
};
export const GetBus = async (req, res, next) => {
  try {
    const Bus = await BusModel.findById(req.params.id);
    res.status(200).json(Bus);
  } catch (error) {
    next(error);
  }
};
export const DeleteBus = async (req, res, next) => {
  try {
    await BusModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Route Deleted Sucsussfully!");
  } catch (error) {
    next(error);
  }
};
