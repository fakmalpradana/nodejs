const fs = require('fs');
const rl = require('readline')

// mendefinisikan lokasi direktori dan file
const dirPath = './data';
const dirFile = './data/contacts.json';

// pengecekan eksistensi direktori dan file
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath); // membuat direktori
};

if (!fs.existsSync(dirFile)) {
    fs.writeFileSync(dirFile,'[]','utf-8'); // membuat file
};