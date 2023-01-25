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
})
.demandCommand();

// menampilkan daftar semua contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama dan no HP contact',
    handler() {
        contact.listContact();
    }
})

// menampilkan detail contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama : {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contact.detailContact(argv.nama);
    }
})

// menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus contact berdasarkan nama',
    builder: {
        nama : {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contact.deleteContact(argv.nama);
    }
})

yargs.parse()