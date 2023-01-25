// mengambil argument dari command line
const yargs = require('yargs');
const contact = require('./contacts')

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact',
    builder: {
        nama: {
            describe: 'Nama pengguna',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email pengguna',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contact.simpanContact(argv.nama, argv.email, argv.noHP);
    },
});

yargs.parse()

// const contact = require('./contacts');

// const main = async () => {
//     const nama = await contact.pertanyaan('Masukkan nama anda : ');
//     const email = await contact.pertanyaan('Masukkan email anda : ');
//     const noHP = await contact.pertanyaan('Masukkan no HP anda : ');

//     contact.simpanContact(nama, email, noHP);
// };

// main();