const fs = require('fs');
const { stringify } = require('querystring');

// menulis string ke file (synchronus)
// fs.writeFileSync('test.tst', 'Hello world secara synchronus')

// menulis string ke file (asynchronus)
// fs.writeFile('data/test.txt', 'halo secara async', (e) => {
//     console.log(e)
// });

// membaca file synchronus
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca file asynchronus
// const data = fs.readFile('data/test.txt', 'utf-8', (e,data) => {
//     if (e) throw e;
//     console.log(data)
// });

//readline
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama : ', (nama) => {
    rl.question('Masukkan noHP: ', (noHP) => {
        const contact = {nama, noHP};
        const buffer = fs.readFileSync('data/contact.json','utf8');
        const jsonFiles = JSON.parse(buffer);

        jsonFiles.push(contact);
        console.log(jsonFiles);

        fs.writeFileSync('data/contact.json', JSON.stringify(jsonFiles))

        rl.close();
    });
});