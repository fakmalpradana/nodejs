const http = require('http');
const fs = require('fs');

const port = 3000;
const renderHTML = (res, path) => {
    fs.readFile(path, (err, data) => {
        if(err) {
            res.writeHead(404);
            res.write('Error: file not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
} 

http
  .createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type' : 'text/html',
    });

    const url = req.url;

    switch (url) {
        case '/about':
            renderHTML(res, './about.html');
            break;
        case '/contact':
            renderHTML(res, './contact.html');
            break;
        default:
            renderHTML(res, './index.html');
            break;
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
  });