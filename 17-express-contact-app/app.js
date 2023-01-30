const expressLayout = require('express-ejs-layouts')
const express = require('express')
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contact')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third party middleware
app.use(expressLayout)

// Built-in middleware
app.use(express.static('public')) // memberikan akses ke folder public
app.use(express.urlencoded({extended: true})) // membaca data yang didapatkan dari input app

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())

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
        msg: req.flash('msg')
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
app.post('/contact', [
    check('email', 'Email tidak valid').isEmail(), 
    check('noHP', 'No HP tidak valid').isMobilePhone('id-ID'),
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value)
        if (duplikat) {
          throw new Error('Nama sudah digunakan, silahkan inputkan nama lain');
        }
        // Indicates the success of this synchronous custom validator
        return true
    })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('add-contact', {
            title: 'Form Tambah Data Contact',
            layout: 'layout/main',
            errors: errors.array(),
        })
    } else {
        addContact(req.body)
        // kirimkan flash message
        req.flash('msg', 'Data contact berhasil ditambahkan')
        res.redirect('/contact')
    }
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