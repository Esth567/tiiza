const fs = require('fs');
const path = require('path');
require('dotenv').config();

const moveFile = (req, res) => {
  const { filename } = req.session.fileData;

  const tempFilePath = path.join(__dirname, '..', 'tmp', filename);
  const newFilePath = path.join(
    __dirname,
    '..',
    'uploads',
    'lost_and_found',
    'lost',
    req.user.email,
    filename
  );

  req.session.newFilePath = {
    newFilePath: `${process.env.DOMAIN_NAME}uploads/lost_and_found/lost/${req.user.email}/${filename}`,
  };

  return renameFile(tempFilePath, newFilePath)
    .then(() => {
      return true;
    })
    .catch((error) => {
      // console.error(error);
      return false;
    });
};

function renameFile(tempFilePath, newFilePath) {
  return new Promise((resolve, reject) => {
    // Creates the directory if it doesn't exist
    const folderPath = path.dirname(newFilePath);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    setTimeout(() => {
      fs.rename(tempFilePath, newFilePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }, 500);
  });
}

module.exports = { moveFile };
