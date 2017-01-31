chai = require('chai');
assert = chai.assert;
expect = chai.expect;

var readDirectory = require('../filtered-files.js');

describe('readDirectory when given valid input', function () {
  it('should return an array of filtered files with the given extension', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/';
    readDirectory(inputPath, 'txt', (err = null, filteredFiles) => {
      expect(filteredFiles.length).to.eqls(6);
      done();
    });
  });

  it('should return an array of filtered files with the given extension when the input directory does not have any files with the extension', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/';
    readDirectory(inputPath, 'XYZ', (err = null, filteredFiles) => {
      expect(filteredFiles.length).to.eqls(0);
      done();
    });
  });
});

describe('readDirectory when given invalid input', function () {
  
  it('should return an error if given a file as path', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/abc.txt';
    readDirectory(inputPath, 'txt', (err = null, filteredFiles) => {
      if (err) {
        expect(err.code).to.eqls('ENOTDIR');
      }
      done();
    });
  });

    it('should return an error if given a empty path', function (done) {
    var inputPath = '';
    readDirectory(inputPath, 'XYZ', (err = null, filteredFiles) => {
        expect(err.code).to.eqls('ENOENT');
      done();
    });
  });
});