const request = require('request')
const chai = require('chai')
const expect = chai.expect

var options = {
  method: 'POST',
  url: 'http://10.31.194.35:8080/write/hzh',
  headers:
  {
    'postman-token': 'ac470a59-550a-0955-7bf9-cbdb64424572',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  }
}

describe('The TODO Api ', function () {
  it('should return a 500 status code when a post method is called with no task description', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      expect(response.statusCode).to.eqls(500)
      done()
    })
  })
})
