const fs = require('fs');

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

// ambil semua data contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync(dirFile, 'utf-8');
    const jsonFile = JSON.parse(fileBuffer);
    
    return jsonFile;
}

// cari contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => {
        return contact.nama.toLowerCase() === nama.toLowerCase();
    });

    return contact
}

module.exports = {loadContact, findContact}