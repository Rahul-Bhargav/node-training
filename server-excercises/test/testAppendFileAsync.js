const appendFileAsync = require('../appendFileAsync.js');
const readFileAsync = require('../readFileAsync.js');
chai = require('chai');
expect = chai.expect;
describe('appendFileAsync when given valid input', function () {
  it('should return the text in the file when a txt file is given', function (done) {
    const inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/TestFolder/sample.txt';
    appendFileAsync(inputPath, 'person in this planet.')
      .then(() => {
        return readFileAsync(inputPath);
      })
      .then((result) => {
        expect('hello i am the best person in this planet.').to.eqls(result);
        done();
      })
      .catch((error) => {
        console.log(error);
        expect(false).to.eqls(true);
        done();
      })
  });

  it('should return the text in the file when an empty txt file is given', function (done) {
    const inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/TestFolder/empty-file.txt';
    appendFileAsync(inputPath, 'person in this planet.')
      .then(() => {
        return readFileAsync(inputPath);
      })
      .then((result) => {
        expect('person in this planet.').to.eqls(result);
        done();
      })
      .catch((error) => {
        expect(false).to.eqls(true);
        done();
      })
  });

});

describe('appendFileAsync when given invalid input', function () {
  it('should return an error when no inputPath is given', function (done) {
    appendFileAsync()
      .then((result) => {
        expect(false).to.eqls(true);
        done();
      })
      .catch((error) => {
        expect('Enter a valid File Path').to.eqls(error);
        done();
      })
  });

  it('should return an error when inputPath given is a directory', function (done) {
    const inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/TestFolder/';
    appendFileAsync(inputPath)
      .then((result) => {
        expect(false).to.eqls(true);
        done();
      })
      .catch((error) => {
        expect('The input path is a Directory').to.eqls(error);
        done();
      })
  });

  it('should return an error when file does not exist', function (done) {
    const inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/TestFolder/bcde.txt';
    appendFileAsync(inputPath)
      .then((result) => {
        expect(false).to.eqls(true);
        done();
      })
      .catch((error) => {
        expect('No file at', inputPath).to.eqls(error);
        done();
      })
  });

  it('should return an error when inputPath given is an object', function (done) {
    const inputPath = {};
    appendFileAsync(inputPath)
      .then((result) => {
        expect(false).to.eqls(true);
        done();
      })
      .catch((error) => {
        expect('Enter a valid File Path').to.eqls(error);
        done();
      })
  });
});