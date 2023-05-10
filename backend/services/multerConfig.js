const multer = require('multer');
const path = require('path');

const initiateMediaTransfer = (req, res, next, _path, dest) => {
  console.log(req.imageFile);
  if (_path === 'lost_and_found') {
  }
  const customerEmail = req.user.email;
  dest = dest === '' ? req.user.email : dest;
  // if
  const storage = multer.diskStorage({
    destination: `./uploads/${_path}/${dest}/${customerEmail}`,
    filename: function (req, file, cb) {
      // console.log(file);
      cb(
        null,
        customerEmail +
          '_Img' +
          '-' +
          Date.now() +
          path.extname(file.originalname),
      );
    },
  });

  const fileFilter = function (req, file, cb) {
    // Only accept certain file types
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(
        new Error('Only .jpeg,jpg and .png files are allowed'),
        false,
      );
    }
  };

  // Set up the Multer middleware

  const upload = multer({
    storage: storage,
    limits: {fileSize: 3000000}, // 3MB
    fileFilter: fileFilter,
  });
  // const imageData = req.imageData;
  return upload.single('image')(req, res, next);
};

module.exports = {initiateMediaTransfer, InitiateUpload};
