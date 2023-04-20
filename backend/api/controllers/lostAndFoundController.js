const fs = require('fs');
const path = require('path');
const { upload } = require('../../services/multerConfig');
const LostItemModel = require('../../models/lostItemModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const FoundItemModel = require('../../models/foundItemModel');

const lostItemCtrl = asyncWrapper(async (req, res) => {

  const { item_name, item_worth, lost_date, lost_location, phone_number, description, report_type, item_color, item_type } = req.body;
  const { email } = req.user;
  if (!item_name || !item_worth || !lost_date || !lost_location || !phone_number || !description || !report_type || !item_color || !item_type)
    return res.status(400).send({ success: false, payload: 'Input fields cannot be empty' });
  //check for invalid date
  const date = new Date(lost_date);
  if (isNaN(date.getTime()))
    return res.status(400).send({ success: false, payload: 'Please Enter a valid date' });
  if (!req.file)
    return res.status(400).send({ success: false, payload: 'Please select an image file' });
  if (description.length < 6 || description.length > 200)
    return res.status(400).send({ success: false, payload: 'Please enter a valid description for your item' });
  let { destination } = req.file;

  destination = destination.slice(1);

  const storeLostInfo = await LostItemModel.create({
    image_url: destination,
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
  //   TODO:
  if (!storeLostInfo)
    return res.status(500).send({ success: false, payload: 'something went wrong' });
  return res.status(200).send({ success: true, payload: 'Thank you for submitting your report. We have received it and will publish it once it has been approved' });
});

const fetchLostItemsCtrl = asyncWrapper(async (req, res) => {

  const getLostItems = await LostItemModel.findAll({ where: { is_approved: true } });
  if (getLostItems.length == 0)
    return res.status(404).send({ success: false, payload: 'No item found' });
  return res.status(200).send({ success: true, payload: getLostItems });
});

const fetchCustomerLostItems = asyncWrapper(async (req, res) => {
  const { email } = req.user;

  const customersItems = await LostItemModel.findAll({ where: { customer_email: email, is_approved: true } });
  if (customersItems.length == 0)
    return res.status(404).send({ success: false, payload: 'No item found' });
  return res.status(200).send({ success: true, payload: customersItems });
});

//====================================================FOUND SECTION===================================================================

const foundLostItemCtrl = asyncWrapper(async (req, res) => {
  const { item_name, discovery_location, date_found, pickup_location, phone_number, item_type, item_color, description } = req.body;
  console.log(item_name, discovery_location, date_found, pickup_location, phone_number);
  if (!item_name || !discovery_location || !date_found || !pickup_location || !phone_number || !item_type || !item_color || !description)
    return res.status(400).send({ success: false, payload: 'Input fields cannot be empty' });
  //check for invalid date
  const date = new Date(date_found);
  if (isNaN(date.getTime()))
    return res.status(400).send({ success: false, payload: 'Please Enter a valid date' });
  if (description.length < 6 || description.length > 200)
    return res.status(400).send({ success: false, payload: 'Please enter a valid description for your item' })
  if (!req.file)
    return res.status(400).send({ success: false, payload: 'Please select an image file' });
  let { destination, path, filename } = req.file;
  destination = destination.slice(2);
  const fullPath = `${destination}${filename}`
  //   return;
  const { email } = req.user;

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
    is_approved: false
  });

  if (!storeFoundInfo)
    return res.status(500).send({ success: false, payload: 'something went wrong' });
  return res.status(200).send({ success: true, payload: 'Thank you for submitting your report. We have received it and will publish it once it has been approved' });
});


const fetchFoundItemsCtrl = asyncWrapper(async (req, res) => {
  const getFoundItems = await FoundItemModel.findAll({ where: { is_approved: true, is_resolved: false } });
  if (getFoundItems.length == 0)
    return res.status(404).send({ success: false, payload: 'No item found' });
  return res.status(200).send({ success: true, payload: getFoundItems });
});

const fetchCustomerFoundItems = asyncWrapper(async (req, res) => {
  const { email } = req.user;

  const customersItems = await FoundItemModel.findAll({ where: { customer_email: email, is_approved: true, is_resolved: false } });
  if (customersItems.length == 0)
    return res.status(404).send({ success: false, payload: 'No item found' });
  return res.status(200).send({ success: true, payload: customersItems });
});


module.exports = {
  lostItemCtrl,
  fetchLostItemsCtrl,
  fetchCustomerLostItems,
  foundLostItemCtrl,
  fetchFoundItemsCtrl,
  fetchCustomerFoundItems,
};
