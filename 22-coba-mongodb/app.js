const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const username = 'fakmalpradana'
const password = 'Akmal2001'

const uri = `mongodb+srv://${username}:${password}@cluster0.hrgzhh5.mongodb.net`

const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useNewUrlParser: true,
})
const dbName = 'test'

client.connect((err, client) => {
  if (err) {
    return console.log('Koneksi gagal...')
  }
  // pilih dan masuk database
  const db = client.db(dbName)
  console.log(`Koneksi berhasil pada database ${dbName}...`)

//   // menampilkan data
//   const allData = db.collection('mahasiswa').find().toArray((err, res) => {
//     console.log(res)
//   })
//   console.log(allData)

//   // menampilkan data berdasarkan kriteria
//   console.log(
//     db
//     .collection('mahasiswa')
//     .find({fakultas:'kedokteran')})
//     .toArray((err, res) => {console.log(res)})
//   )
//   // menampilkan data berdasarkan id
//   console.log(
//     db
//     .collection('mahasiswa')
//     .find({_id:ObjectId("63d883a04df7c36cf3c9149c")})
//     .toArray((err, res) => {console.log(res)})
//   )

  //   menambahkan 1 data mahasiswa
//   db.collection('mahasiswa').insertOne(
//     {
//     nama: 'Fairuz Akmal',
//     fakultas: 'kedokteran',
//     noHP: '082136458734',
//     },
//     (error, result) => {
//         if (error) {
//             return console.log('gagal menambahkan data.')
//         }

//         console.log(result)
//     }
//   )

//   // menambahkan lebih dari 1 data
//   db.collection('mahasiswa').insertMany(
//     [
//         {
//             nama: 'Yoga',
//             fakultas: 'fkg',
//             noHP: '082231276349',
//         },
//         {
//             nama: 'Ibnu',
//             fakultas: 'kedokteran',
//             noHP: '082198631937',
//         }
//     ],
//     (error, result) => {
//         if (error) {
//             return console.log('gagal menambahkan data')
//         }
//         console.log(result)
//     }
//   )
//   // mengubah satu data (update) dengan promise
//   const updatePromise = db.collection('mahasiswa').updateOne({
//     _id: ObjectId("63d883a04df7c36cf3c9149c")
//   },
//   {
//     $set: {
//         nama: 'Fairuz'
//     }
//   }
//   )

//   updatePromise.then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//   // mengubah banyak data (update) dengan promise
//   const updatePromise = db.collection('mahasiswa').updateMany({
//     fakultas: 'kedokteran'
//   },
//   {
//     $set: {
//         fakultas: 'fk'
//     }
//   }
//   )

//   updatePromise.then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//   // menghapus satu data
//   db.collection('mahasiswa').deleteOne({
//     _id: ObjectId("63d89a89f76f913bae21efb1")
//     }
//   ).then((result) => {
//     console.log(result)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

//   // menghapus banyak data
//   db.collection('mahasiswa').deleteMany({
//     fakultas: 'fk'
//     }
//   ).then((result) => {
//     console.log(result)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
})