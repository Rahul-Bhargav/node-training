const fs = require('fs')
const path = require('path')

function fileAppend (inputPath, text) {
  return new Promise((resolve, reject) => {
    fs.appendFile(inputPath, text, (err) => {
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

      return
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
      if (!(path.extname(inputPath) === '.txt')) {
        reject('The input path is not txt')
      }
      resolve()
    })
  })
}

function appendFileAsync (inputPath, text) {
  return checkFileValidity(inputPath)
    .then(() => fileAppend(inputPath, text))
}

appendFileAsync().then()
module.exports = appendFileAsync
