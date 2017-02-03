net = require('net');
var portNumber = process.argv[2];

server = net.createServer((socket) => {
  let date = new Date();
  let month = date.getMonth() + 1;
  month = ('00' + month).slice(-2);
  let day = date.getDate();


  day = ('00' + (day)).slice(-2);

  let hours = date.getHours();
  hours = ('00' + hours).slice(-2);
  let minutes = date.getMinutes();
  minutes = ('00' + minutes).slice(-2);

  socket.end(`${date.getFullYear()}-${month}-${day} ${hours}:${minutes}\n`);
});
server.listen(portNumber);