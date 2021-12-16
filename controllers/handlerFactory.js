const catchAsync = require("../utils/catchAsync");

exports.findAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    if (!doc) {
      return res.status(404).send({
        status: "fail",
        message: `No documents found at route: ${req.route}`,
      });
    }
    res.status(200).send({
      status: "success",
      doc,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return res.status(404).send({
        status: "fail",
        message: `No documents found at route: ${req.route}`,
      });
    }
    res.status(200).send({
      status: "success",
      doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!doc) {
      return res.status(404).send({
        status: "fail",
        message: `No documents found at route: ${req.route}`,
      });
    }
    res.status(200).send({
      status: "success",
      doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).send({
        status: "fail",
        message: `No documents found at route: ${req.route}`,
      });
    }
    res.status(204).send({
      status: "success",
    });
  });
