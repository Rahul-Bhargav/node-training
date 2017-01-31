chai = require('chai');
assert = chai.assert;
expect = chai.expect;

var readAsync = require('../async-file-read.js');

describe('readAsync when given valid input', function () {
  it('should return the number of newlines in the file when the input file is \'.txt\'', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/abc.txt';
    readAsync(inputPath, (err = null, count) => {
      if (err) console.log(err);
      expect(count).to.eqls(2);
      done();
    });
  });
  it('should return 0 when the input file is \'.txt\' and has one lines', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/one-line-file.txt';
    readAsync(inputPath, (err = null, count) => {
      if (err) console.log(err);
      expect(count).to.eqls(0);
      done();
    });
  });

  it('should return 0 when the input file is \'.txt\' and is empty', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/empty-file.txt';
    readAsync(inputPath, (err = null, count) => {
      if (err) console.log(err);
      expect(count).to.eqls(0);
      done();
    });
  });

  it('should return  the number of newlines in the file when the input file is an image with \'.txt\'', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/other-ext.txt';
    readAsync(inputPath, (err = null, count) => {
      if (err) console.log(err);
      expect(count).to.eqls(0);
      done();
    });
  });
});

describe('readAsync when given invalid input', function () {
  it('should return an error if the file does not exists', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/no-file.txt';
    readAsync(inputPath, (err = null, count = 0) => {
      expect(err).to.eqls(`The file at ${inputPath} does not exist.`);
      done();
    });
  });

  it('should return an error if the file is not \'.txt\'', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/abc.d';
    readAsync(inputPath, (err = null, count = 0) => {
      expect(err).to.eqls(`Please input should be a .txt file .The file at ${inputPath} is not a .txt file`);
      done();
    });
  });

  it('should return an error if the file exceeds 550KB', function (done) {
    var inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/learnyounode/patchwork-ss.txt';
    readAsync(inputPath, (err = null, count = 0) => {
      expect(err).to.eqls(`The uploaded file exceeds file limit(100 MB). The given file size is ${count}MB.`);
      done();
    });
  });
});