const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

// membuat variabel pertanyaan
const pertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (jawaban) => {
            resolve(jawaban);
        });
    });
};

// membuat fungsi simpan contact
const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    const fileBuffer = fs.readFileSync(dirFile, 'utf-8');
    const jsonFile = JSON.parse(fileBuffer);

    jsonFile.push(contact);

    fs.writeFileSync(dirFile, JSON.stringify(jsonFile));

    console.log('Terima kasih, telah menginput data');
    rl.close();
}

// export module
module.exports = {pertanyaan, simpanContact}