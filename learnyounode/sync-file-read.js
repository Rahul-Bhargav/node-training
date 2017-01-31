fs = require('fs');
var inputPath = process.argv[2];
if (fs.existsSync(inputPath)) {
  try {
    var dataBuffer = fs.readFileSync(inputPath);
    var lineCount = dataBuffer.toString().split('\n').length - 1;
    console.log(lineCount);
  } catch (err) {
    console.log(err);
  }
} else {
  console.log(`The file at ${inputPath} does not exist`);
}