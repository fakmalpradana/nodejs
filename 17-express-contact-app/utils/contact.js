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

// menuliskan/menimpa file contact.json
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
}

// menambahkan data contact ke dalam array json
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

// cek duplikat nama
const cekDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama)
}

// hapus contact
const deleteContact = (nama) => {
    const contacts = loadContact()
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama)
    saveContacts(filteredContacts)
}

// mengubah contact
const updateContacts = (contactBaru) => {
    const contacts = loadContact()
    // hilangkan contact nama yang namanya sama dengan oldNama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama)
    delete contactBaru.oldNama
    filteredContacts.push(contactBaru)
    saveContacts(filteredContacts)
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}