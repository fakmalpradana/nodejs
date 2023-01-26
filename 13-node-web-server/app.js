const http = require('http');

http
  .createServer((req, res) => {
    res.write('Halo!!');
    res.end();
  })
  .listen(3000, () => {
    console.log('Server is listening on port 3000 ..')
  });