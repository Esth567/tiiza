const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
require('dotenv').config();
// ************************|| MODULES || **********************
const { upload } = require('../../services/multerConfig');
const LostItemModel = require('../../models/lostItemModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const FoundItemModel = require('../../models/foundItemModel');
const { createCustomError } = require('../../middleware/customError');
const { formatCurrency } = require('../../utils/formatters');
const { checkSubscription } = require('../../utils/validateSubscription');
const { logger } = require('../../utils/winstonLogger');
const {
  LostItemRegistrationValidator,
  FoundItemRegistrationValidator,
  DateValidator,
} = require('../../validation/validation');

//==================================================== || REGISTER LOST ITEM || ===================================================================

const lostItemCtrl = asyncWrapper(async (req, res, next) => {
  if (!req.file) return next(createCustomError('Missing Attachment', 400));
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

  const { email } = req.user;
  const { error } = new LostItemRegistrationValidator(req.body).validate();
  if (error) return next(createCustomError(error.message, 400));

  if (isNaN(item_worth))
    return next(createCustomError('Please enter a  valid  amount for your item worth', 400));
  item_worth = parseFloat(item_worth);
  //check for invalid date
  const date = new Date(lost_date);
  const isDateValid = new DateValidator(lost_date).validate();
  if (!isDateValid)
    return res.status(400).send({ success: false, payload: 'Please Enter a valid date' });
  if (!req.file)
    return res.status(400).send({ success: false, payload: 'Please select an image file' });

  req.session.paymentPayload = {
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
  };
  req.session.fileData = req.file;

  res.sendStatus(200);
});

//==================================================== || FETCH LOST ITEM || ===================================================================

const fetchLostItemsCtrl = asyncWrapper(async (req, res) => {
  const { location } = req.user;

  async function fetchItems(_location) {
    if (_location) {
      const getLostItems = await LostItemModel.findAll({
        where: {
          is_approved: true,
          is_resolved: false,
          is_found: false,
          lost_location: {
            [Op.regexp]: `(${_location}|${_location.toUpperCase()})`,
          },
        },
      });
      return getLostItems;
    } else {
      const getLostItems = await LostItemModel.findAll({
        where: { is_approved: true, is_resolved: false },
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
    return res.status(200).send({ success: true, payload: lostItems });
  } else {
    const lostItems = await fetchItems(location);
    if (lostItems.length == 0)
      return res.status(404).send({ success: false, payload: 'No item found' });
    return res.status(200).send({
      success: true,
      payload: {
        // message: `Please renew your subscription to access items found in other states.`,
        data: lostItems,
      },
    });
  }
});

//==================================================== || FETCH CUSTOMER LOST ITEM || ===================================================================

const fetchCustomerLostItemsCtrl = asyncWrapper(async (req, res) => {
  const { email } = req.user;
  const customersItems = await LostItemModel.findAll({
    where: {
      customer_email: email,
      // is_approved: true,
      // is_found: false,
    },
  });
  if (customersItems.length == 0)
    return res.status(404).send({ success: false, payload: 'No item found' });
  return res.status(200).send({ success: true, payload: customersItems });
});

//========================================================== || FOUND SECTION || ===================================================================

const foundLostItemCtrl = asyncWrapper(async (req, res, next) => {
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
  const { error } = new FoundItemRegistrationValidator(req.body).validate();

  if (error) return next(createCustomError(error.message, 400));
  //check for invalid date
  const date = new Date(date_found);
  const isDateValid = new DateValidator(date_found).validate();
  if (!isDateValid)
    return res.status(400).send({ success: false, payload: 'Please Enter a valid date' });

  if (!req.file)
    return res.status(400).send({ success: false, payload: 'Please select an image file' });
  let { destination, path, filename } = req.file;
  destination = destination.slice(2);
  const fullPath = `${process.env.DOMAIN_NAME}${destination}/${filename}`;
  //   return;
  const { email, user_id } = req.user;

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
    logger.error('Failed to register Found Item in Database', {
      module: 'lostAndFoundController.js',
      userId: req.user ? req.user.user_id : null,
      requestId: requestId,
      method: req.method,
      path: req.path,
      action: 'Save Found Item ',
      statusCode: 500,
      clientIp: req.clientIp,
    });

    return res.status(500).send({ success: false, payload: 'Sorry,something went wrong' });
  }

  return res.status(201).send({
    success: true,
    payload:
      'Thank you for submitting your report. We have received it and will publish it once it has been approved',
  });
});

//========================================================== || FETCH FOUND ITEMS  || ===================================================================

const fetchFoundItemsCtrl = asyncWrapper(async (req, res) => {
  const { user_id, location } = req.user;
  async function fetchItems(_location) {
    if (_location) {
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
        where: { is_approved: true, is_resolved: false },
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
        payload: 'No item Found in your region.Please contact our customer service for more info ',
      });
    return res.status(200).send({ success: true, payload: foundItems });
  } else {
    const foundItems = await fetchItems(location);
    if (foundItems.length == 0)
      return res.status(404).send({ success: false, payload: 'No item found' });
    return res.status(200).send({
      success: true,
      payload: {
        message: `Please renew your subscription to access items found in other states.`,
        data: foundItems,
      },
    });
  }
});

//========================================================== || FETCH CUSTOMER FOUND ITEMS  || ===================================================================

const fetchCustomerFoundItemsCtrl = asyncWrapper(async (req, res) => {
  const { email } = req.user;

  checkSubscription(req);
  const customersItems = await FoundItemModel.findAll({
    where: {
      customer_email: email,
      is_approved: true,
    },
  });
  if (customersItems.length == 0)
    return res.status(404).send({ success: false, payload: 'No item found' });
  return res.status(200).send({ success: true, payload: customersItems });
});

module.exports = {
  lostItemCtrl,
  foundLostItemCtrl,
  fetchLostItemsCtrl,
  fetchFoundItemsCtrl,
  fetchCustomerLostItemsCtrl,
  fetchCustomerFoundItemsCtrl,
};
