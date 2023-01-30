const expressLayout = require('express-ejs-layouts')
const express = require('express')
const {loadContact, findContact} = require('./utils/contact')

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third party middleware
app.use(expressLayout)

// Built-in middleware
app.use(express.static('public')) // memberikan akses ke folder public
app.use(express.urlencoded()) // membaca data yang didapatkan dari input app

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

// halaman about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layout/main'
    })
  })

// halaman contact
app.get('/contact', (req, res) => {
    const contacts = loadContact()
    
    res.render('contact', {
        title:'Halaman Contact',
        layout: 'layout/main',
        contacts: contacts,
    })
})

// halaman form tambah contact
app.get('/contact/add', (req,res) => {
    res.render('add-contact', {
        title: 'Form Tambah Contact',
        layout: 'layout/main',
    })
})

// proses add data contact
app.post('/contact', (req, res) => {
    addContact(req.body)
    res.redirect('/contact')
})

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    
    res.render('detail', {
        title:'Halaman Contact',
        layout: 'layout/main',
        contact: contact,
    })
})

// halaman 404
app.use((req, res) => {
    res.status(404)
    res.send('<h1>Page not found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})