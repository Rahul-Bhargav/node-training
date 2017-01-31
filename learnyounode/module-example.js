filterModule = require('./filtered-files.js');
var inputPath = process.argv[2];
var extension = process.argv[3];

var callBack = (err, filteredFiles) => {
  if (err) console.log (err);
  filteredFiles.forEach((inputFile) => {
      console.log(inputFile);
  });
}

filterModule(inputPath, extension, callBack);