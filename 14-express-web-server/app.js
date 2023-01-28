
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    // res.send('Hello World!')
    // res.json({
    //     nama: 'Fairuz Akmal P',
    //     email: 'fakmalpradana@gmail.com',
    //     noHP : '082131065892'
    // })
    res.sendFile('./index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    // res.send('Ini halaman about')
    res.sendFile('./about.html', {root: __dirname})
  })

app.get('/contact', (req, res) => {
    // res.send('Ini halaman contact')
    res.sendFile('./contact.html', {root: __dirname})
})

app.get('/produk/:id', (req, res) => {
    res.send(`produk id : ${req.params.id} <br> produk category : ${req.query.cat}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>Page not found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const http = require('http');
// const fs = require('fs');

// const port = 3000;
// const renderHTML = (res, path) => {
//     fs.readFile(path, (err, data) => {
//         if(err) {
//             res.writeHead(404);
//             res.write('Error: file not found!');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// } 

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type' : 'text/html',
//     });

//     const url = req.url;

//     switch (url) {
//         case '/about':
//             renderHTML(res, './about.html');
//             break;
//         case '/contact':
//             renderHTML(res, './contact.html');
//             break;
//         default:
//             renderHTML(res, './index.html');
//             break;
//     }
//   })
//   .listen(port, () => {
//     console.log(`Server is listening on port ${port}...`)
//   });