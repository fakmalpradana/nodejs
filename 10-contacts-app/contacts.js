const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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

// membuat fungsi simpan contact
const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    const fileBuffer = fs.readFileSync(dirFile, 'utf-8');
    const jsonFile = JSON.parse(fileBuffer);

    // cek duplikat nama
    const duplikat = jsonFile.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log(
            chalk.red.inverse.bold('Contact sudah ada, gunakan nama lain'));
        return false;
    };

    // cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold('Email tidak valid'));
            return false;
        }
    }

    // cek no HP
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(
            chalk.red.inverse.bold('No HP tidak valid'));
        return false;
    }

    jsonFile.push(contact);

    fs.writeFileSync(dirFile, JSON.stringify(jsonFile));

    console.log(chalk.green.inverse.bold('Terima kasih, telah menginput data'));
}

// export module
module.exports = {simpanContact}