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

const loadContact = () => {
    const fileBuffer = fs.readFileSync(dirFile, 'utf-8');
    const jsonFile = JSON.parse(fileBuffer);
    return jsonFile;
}

// membuat fungsi simpan contact
const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    const jsonFile = loadContact()

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

// membuat fungsi list contact
const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.yellow.inverse.bold('Daftar Kontak :'));
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} | ${contact.noHP} | ${contact.email}`);
    });
};

// membuat fungsi detail contact
const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => {
        return contact.nama.toLowerCase() === nama.toLowerCase();
    });
    
    if(!contact) {
        console.log(
            chalk.red.inverse.bold(`Kontak ${nama} tidak ditemukan`));
        return false;
    };

    console.log(chalk.italic(`nama : ${contact.nama}`));
    console.log(chalk.italic(`email : ${contact.email}`));
    console.log(chalk.italic(`noHP : ${contact.noHP}`));
};

// membuat fungsi delete contact
const deleteContact = (nama => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => {
        return contact.nama.toLowerCase() !== nama.toLowerCase();
    });

    if(contacts.length === newContacts.length) {
        console.log(
            chalk.red.inverse.bold(`Kontak ${nama} tidak ditemukan`));
        return false;
    };

    fs.writeFileSync(dirFile, JSON.stringify(newContacts));

    console.log(chalk.green.inverse.bold(`Kontak ${nama} berhasil dihapus`));
});

// export module
module.exports = {simpanContact, listContact, detailContact, deleteContact}