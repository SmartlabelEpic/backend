// fileUpload.js (in a 'utils' or 'services' folder)

const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

// Function to handle file uploads
const handleFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    // Set the upload directory (where the file will be stored)
    form.uploadDir = path.join(__dirname, '../uploads');
    form.keepExtensions = true; // Keep file extension

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ message: 'File upload failed', error: err });
        return;
      }

      // Returning the parsed form fields (text data) and file info
      resolve({ fields, files });
    });
  });
};

module.exports = handleFileUpload;
