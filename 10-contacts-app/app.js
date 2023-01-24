const contact = require('./contacts');

const main = async () => {
    const nama = await contact.pertanyaan('Masukkan nama anda : ');
    const email = await contact.pertanyaan('Masukkan email anda : ');
    const noHP = await contact.pertanyaan('Masukkan no HP anda : ');

    contact.simpanContact(nama, email, noHP);
};

main();