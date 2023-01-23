function cetakNama(nama) {
    return `halo saya ${nama}`;
}

const pi = 3.14;

const mahasiswa = {
    nama : 'Fairuz Akmal Pradana',
    umur : 21,
    cetakMhs() {
        return `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun`
    },
}

class Orang {
    constructor() {
        console.log('objek orang telah dibuat')
    }
}

// module.exports.cetakNama = cetakNama
// module.exports.pi = pi
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang

// module.exports = {
//     cetakNama : cetakNama,
//     pi : pi,
//     mahasiswa : mahasiswa,
//     Orang : Orang
// }

module.exports = {cetakNama, pi, mahasiswa, Orang}