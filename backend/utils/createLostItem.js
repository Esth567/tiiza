const {createCustomError} = require('../middleware/customError');
const LostItemModel = require('../models/lostItemModel');
const {moveFile} = require('./moveFile');
const {logger} = require('./winstonLogger');

const createLostItem = async (req, res, next, ...rest) => {
  const payload = {};

  rest.forEach(prop => {
    Object.assign(payload, prop);
  });

  moveFile(req, res, next);

  const {newFilePath: destPath} = req.session.newFilePath;
  const {
    item_name,
    item_worth,
    item_type,
    lost_date,
    lost_location,
    phone_number,
    description,
    report_type,
    item_color,
    customer_email,
    is_approved,
  } = payload;
  const storeLostInfo = await LostItemModel.create({
    image_url: destPath,
    item_name,
    item_worth,
    item_type,
    lost_date,
    lost_location,
    phone_number,
    description,
    report_type,
    item_color,
    customer_email,
    is_approved,
    // customer_id: user_id,
  });

  // console.log(storeLostInfo);
  if (!storeLostInfo) return null;

  return storeLostInfo;
};

module.exports = {createLostItem};
