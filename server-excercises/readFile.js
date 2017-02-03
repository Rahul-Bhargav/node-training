const fs = require('fs');
const inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/README.md';

const readfilePromise = new Promise((resolve, reject) => {
  fs.readFile(inputPath, (err, fileBuffer) => {
    if (err) {
      reject(err);
    }
    resolve(fileBuffer);
  });
})

readfilePromise
.then((buffer) => {
  console.log(buffer.toString());
})
.catch((reason) => {
  console.log(reason);
});