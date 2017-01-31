fs = require('fs');
path = require('path');

function readDirectory(inputPath, extension, callback) {

  fs.readdir(inputPath, (err, files) => {
    if (err) return callback(err)
    filteredfiles = files.filter((inputFile) => {
      return path.extname(inputFile) === `.${extension}`;
    });
    callback(null, filteredfiles);
  });
}

module.exports = readDirectory;
