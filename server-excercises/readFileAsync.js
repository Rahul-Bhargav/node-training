const fs = require('fs')

function fileRead (inputPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(inputPath, (err, fileBuffer) => {
      if (err) {
        reject(err)
      }
      resolve(fileBuffer)
    })
  })
}

function checkFileValidity (inputPath) {
  return new Promise((resolve, reject) => {
    if (typeof inputPath !== 'string') {
      reject('Enter a valid File Path')
    }
    fs.stat(inputPath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          reject('No file at', inputPath)
          return
        }
        reject(err)
        return
      }
      if (stats.isDirectory()) {
        reject('The input path is a Directory')
      }
      // if file size is greater than 100MB
      if (stats['size'] > 104857600) {
        reject('The file size exceeds 100MB')
      }
      resolve()
    })
  })
}

function readFileAsync (inputPath) {
  // Impementation 1

  // return Promise.all([fileStatPromise(), textFilePromise(), readFilePromise()]);

  // Impementation 2

  return new Promise((resolve, reject) => {
    checkFileValidity(inputPath)
      .then(() => {
        return fileRead(inputPath)
      })
      .then((fileBuffer) => {
        resolve(fileBuffer)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = readFileAsync
