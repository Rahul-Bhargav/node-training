const fs = require('fs')

function fileWrite (inputPath, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(inputPath, text, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
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
      // If file size is greater than 100MB
      if (stats.size > 104857600) {
        reject('The file size exceeds 100MB')
      }
      resolve()
    })
  })
}

function writeFileAsync (inputPath, text) {
  return new Promise((resolve, reject) => {
    checkFileValidity(inputPath)
      .then(() => fileWrite(inputPath, text))
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = writeFileAsync
