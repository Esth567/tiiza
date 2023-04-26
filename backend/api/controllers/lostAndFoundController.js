const fs = require('fs');
const path = require('path');
const {upload} = require('../../services/multerConfig');
const LostItemModel = require('../../models/lostItemModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const FoundItemModel = require('../../models/foundItemModel');
const {createCustomError} = require('../../middleware/customError');
const {formatCurrency} = require('../../utils/formatters');
const {
  checkSubscription,
} = require('../../utils/validateSubscription');
const {logger} = require('../../utils/winstonLogger');
const {Op} = require('sequelize');
require('dotenv').config();

const lostItemCtrl = asyncWrapper(async (req, res) => {
  let {
    item_name,
    item_worth,
    lost_date,
    lost_location,
    phone_number,
    description,
    report_type,
    item_color,
    item_type,
  } = req.body;
  const {email} = req.user;
  if (
    !item_name ||
    !item_worth ||
    !lost_date ||
    !lost_location ||
    !phone_number ||
    !description ||
    !report_type ||
    !item_color ||
    !item_type
  )
    return res.status(400).send({
      success: false,
      payload: 'Input fields cannot be empty',
    });

  if (isNaN(item_worth))
    return next(
      createCustomError(
        'Please enter a  vaid  amount for your item worth',
        400,
      ),
    );
  item_worth = parseFloat(item_worth);

  if (item_worth >= process.env.TIIZA_REAL_CHARGE)
    return res.status(307).send({
      success: false,
      payload: {
        message: `Sorry, Our free package Only allows registration of items NOT up to the value of ${formatCurrency(
          10000,
        )}. However, if you wish to register an item worth more than this amount, we kindly request that you upgrade to our premium package for a registration fee of ${formatCurrency(
          2500,
        )}`,
        redirectUrl: '/customer/subscriptions',
      },
    });
  //check for invalid date
  const date = new Date(lost_date);
  if (isNaN(date.getTime()))
    return res
      .status(400)
      .send({success: false, payload: 'Please Enter a valid date'});
  if (!req.file)
    return res
      .status(400)
      .send({success: false, payload: 'Please select an image file'});
  if (description.length < 6 || description.length > 200)
    return res.status(400).send({
      success: false,
      payload: 'Please enter a valid description for your item',
    });

  let {destination, path, filename} = req.file;
  destination = destination.slice(2);
  const fullPath = `${destination}${filename}`;

  const storeLostInfo = await LostItemModel.create({
    image_url: fullPath,
    item_name,
    item_worth,
    item_type,
    lost_date: date,
    lost_location,
    phone_number,
    description,
    report_type,
    item_color,
    customer_email: email,
    is_approved: false,
  });

  if (!storeLostInfo) {
    logger.error('Unable to register Lost Item in Database', {
      errorSource: 'lostitem DB',
      userId: req.user.user_id,
      errorType: 'DB Error',
      action: 'register lost item',
      statusCode: 500,

      ip: req.clientIp,
    });
    return res
      .status(500)
      .send({success: false, payload: 'something went wrong'});
  }
  return res.status(200).send({
    success: true,
    payload:
      'Thank you for submitting your report. We have received it and will publish it once it has been approved',
  });
});

const fetchLostItemsCtrl = asyncWrapper(async (req, res) => {
  const {user_id, location} = req.user;

  async function fetchItems(_location) {
    if (_location) {
      const getLostItems = await LostItemModel.findAll({
        where: {
          is_approved: true,
          is_resolved: false,
          lost_location: {
            [Op.regexp]: `(${_location}|${_location.toUpperCase()})`,
          },
        },
      });
      return getLostItems;
    } else {
      const getLostItems = await LostItemModel.findAll({
        where: {is_approved: true, is_resolved: false},
      });
      return getLostItems;
    }
  }
  const isSubscribed = await checkSubscription(req);
  if (isSubscribed) {
    const lostItems = await fetchItems(null);
    if (lostItems.length == 0)
      return res.status(404).send({
        success: false,
        payload: 'No item Found in your region ',
      });
    return res.status(200).send({success: true, payload: lostItems});
  } else {
    const lostItems = await fetchItems(location);
    if (lostItems.length == 0)
      return res
        .status(404)
        .send({success: false, payload: 'No item found'});
    return res.status(200).send({
      success: true,
      payload: {
        message: `Please renew your subscription to access items found in other states.`,
        data: lostItems,
      },
    });
  }
});

const fetchCustomerLostItemsCtrl = asyncWrapper(async (req, res) => {
  const {email} = req.user;

  const customersItems = await LostItemModel.findAll({
    where: {customer_email: email, is_approved: true},
  });
  if (customersItems.length == 0)
    return res
      .status(404)
      .send({success: false, payload: 'No item found'});
  return res
    .status(200)
    .send({success: true, payload: customersItems});
});

//====================================================FOUND SECTION===================================================================

const foundLostItemCtrl = asyncWrapper(async (req, res) => {
  const {
    item_name,
    discovery_location,
    date_found,
    pickup_location,
    phone_number,
    item_type,
    item_color,
    description,
  } = req.body;
  console.log(
    item_name,
    discovery_location,
    date_found,
    pickup_location,
    phone_number,
  );
  if (
    !item_name ||
    !discovery_location ||
    !date_found ||
    !pickup_location ||
    !phone_number ||
    !item_type ||
    !item_color ||
    !description
  )
    return res.status(400).send({
      success: false,
      payload: 'Input fields cannot be empty',
    });
  //check for invalid date
  const date = new Date(date_found);
  if (isNaN(date.getTime()))
    return res
      .status(400)
      .send({success: false, payload: 'Please Enter a valid date'});
  if (description.length < 6 || description.length > 200)
    return res.status(400).send({
      success: false,
      payload: 'Please enter a valid description for your item',
    });
  if (!req.file)
    return res
      .status(400)
      .send({success: false, payload: 'Please select an image file'});
  let {destination, path, filename} = req.file;
  destination = destination.slice(2);
  const fullPath = `${destination}${filename}`;
  //   return;
  const {email, user_id} = req.user;

  const storeFoundInfo = await FoundItemModel.create({
    image_url: fullPath,
    item_type,
    item_name,
    discovery_location,
    date_found: date,
    pickup_location,
    customer_email: email,
    phone_number,
    item_color,
    description,
    is_approved: false,
  });

  if (!storeFoundInfo) {
    logger.error('Unable to register Found Item in Database', {
      errorSource: 'foundIten DB',
      userId: user_id,
      errorType: 'DB Error',
      action: 'register found item',
      statusCode: 500,
      ip: req.clientIp,
    });
    return res
      .status(500)
      .send({success: false, payload: 'Sorry,something went wrong'});
  }
  return res.status(201).send({
    success: true,
    payload:
      'Thank you for submitting your report. We have received it and will publish it once it has been approved',
  });
});

const fetchFoundItemsCtrl = asyncWrapper(async (req, res) => {
  const {user_id, location} = req.user;
  async function fetchItems(_location) {
    if (_location) {
      console.log('logged');
      const getFoundItems = await FoundItemModel.findAll({
        where: {
          is_approved: true,
          is_resolved: false,
          discovery_location: {
            [Op.regexp]: `(${_location}|${_location.toUpperCase()})`,
          },
        },
      });
      return getFoundItems;
    } else {
      const getFoundItems = await FoundItemModel.findAll({
        where: {is_approved: true, is_resolved: false},
      });
      return getFoundItems;
    }
  }

  const isSubscribed = await checkSubscription(req);
  if (isSubscribed) {
    const foundItems = await fetchItems(null);
    if (foundItems.length == 0)
      return res.status(404).send({
        success: false,
        payload: 'No item Found in your region ',
      });
    return res.status(200).send({success: true, payload: foundItems});
  } else {
    const foundItems = await fetchItems(location);
    if (foundItems.length == 0)
      return res
        .status(404)
        .send({success: false, payload: 'No item found'});
    return res.status(200).send({
      success: true,
      payload: {
        message: `Please renew your subscription to access items found in other states.`,
        data: foundItems,
      },
    });
  }
});

const fetchCustomerFoundItemsCtrl = asyncWrapper(async (req, res) => {
  const {email} = req.user;

  checkSubscription(req);
  const customersItems = await FoundItemModel.findAll({
    where: {
      customer_email: email,
      is_approved: true,
      is_resolved: false,
    },
  });
  if (customersItems.length == 0)
    return res
      .status(404)
      .send({success: false, payload: 'No item found'});
  return res
    .status(200)
    .send({success: true, payload: customersItems});
});

module.exports = {
  lostItemCtrl,
  fetchLostItemsCtrl,
  foundLostItemCtrl,
  fetchCustomerLostItemsCtrl,
  fetchFoundItemsCtrl,
  fetchCustomerFoundItemsCtrl,
};
