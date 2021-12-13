const catchAsync = require('../utils/catchAsync');

exports.findAll = (Model) => catchAsync(async (req, res, next ) => {
  const doc = await Model.find();
  if (!doc) {
      return res.status(404).send({
          status: 'fail',
          message: 'No documents found'
      });
  };
  res.status(200).send({
      status: 'success',
      data: doc,
  });
});
