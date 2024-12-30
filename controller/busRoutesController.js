import busRoutesModel from "../models/busRoutesModel.js";

export const CreateBusRouteController = async (req, res, next) => {
  const newBusRoutes = new busRoutesModel(req.body);

  try {
    const createBusRoute = await newBusRoutes.save();
    res.status(200).json(createBusRoute);
  } catch (error) {
    next(error);
  }
};

export const UpdateBusRouteController = async (req, res, next) => {
  try {
    const updateBusRoute = await busRoutesModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateBusRoute);
  } catch (error) {
    next(error);
  }
};

export const GetAllBusRouteController = async (req, res, next) => {
  try {
    const allBusRoute = await busRoutesModel.find()
    .populate('driverId', 'name licenseNo mobileNo email');
    res.status(200).json(allBusRoute);
  } catch (error) {
    next(error);
  }
};

export const GetBusRouteController = async (req, res, next) => {
  try {
    const BusRoute = await busRoutesModel.findById(req.params.id);
    res.status(200).json(BusRoute);
  } catch (error) {
    next(error);
  }
};
export const DeleteBusRouteController = async (req, res, next) => {
  try {
    await busRoutesModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Route Deleted Sucsussfully!");
  } catch (error) {
    next(error);
  }
};
