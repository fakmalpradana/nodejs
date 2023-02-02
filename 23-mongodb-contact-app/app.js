const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express()
const port = 3000

// halaman home
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Fairuz',
            email: 'fairuz@gmail.com'
        },
        {
            nama: 'Akmal',
            email: 'akmal@gmail.com'
        },
        {
            nama: 'Pradana',
            email: 'pradana@gmail.com'
        },
    ]
    res.render('index', {
        nama: 'Akmal', 
        title: 'Halaman Home',
        mahasiswa: mahasiswa,
        layout: 'layout/main'
    })
})

app.listen(port, () => {
    console.log(`Mongo Contact App | Listening in http://localhost:${port}`)
})