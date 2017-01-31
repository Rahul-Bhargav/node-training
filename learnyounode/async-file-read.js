fs = require('fs');
path = require('path');

function readAsync(inputPath, callback) {
  var lineCount = 0;
  if (!(typeof inputPath === 'string')) {
    return `Please provide an inputPath`;
  }
  fs.exists(inputPath, (exists) => {
    if (!exists) {
      callback(`The file at ${inputPath} does not exist.`);
    }
  });

  if (!(path.extname(inputPath) === '.txt')) {
    callback(`Please input should be a .txt file .The file at ${inputPath} is not a .txt file`);
  }

  fs.stat(inputPath, (err, stats) => {
    var sizeInKiloBytes = stats['size'] / 1000;
    if (sizeInKiloBytes > 500) {
      callback(`The uploaded file exceeds file limit(100 MB). The given file size is ${sizeInKiloBytes}MB.`, sizeInKiloBytes);
    }
  });

  fs.readFile(inputPath, 'utf8', (err, fileBuffer) => {
    if (err) {
      callback(err);
    }
    lineCount = fileBuffer.toString().split('\n').length - 1;
    callback(null, lineCount);
  });
}

module.exports = readAsync;