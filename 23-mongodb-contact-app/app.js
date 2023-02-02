const express = require('express')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const { body, validationResult, check } = require('express-validator')
const methodOverride = require('method-override')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// setup method-override
app.use(methodOverride('_method'))

// setup ejs
app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.static('public')) 
app.use(express.urlencoded({extended: true})) 

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
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()
    
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
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({nama: value})
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
        Contact.insertMany(req.body, (error, result) => {
        // kirimkan flash message
        req.flash('msg', 'Data contact berhasil ditambahkan')
        res.redirect('/contact')
        })
    }
})

// proses route delete contact
app.delete('/contact', (req, res) => {
    Contact.deleteOne({nama: req.body.nama}).then((result) => {
        req.flash('msg', 'Data contact berhasil dihapus')
        res.redirect('/contact')
    })
})
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({nama: req.params.nama})
//     // jika contact tidak ada
//     if (!contact) {
//         res.status(404)
//         res.send('<h1>404</h1>')
//     } else {
//         Contact.deleteOne({_id: contact._id}).then((result) => {
//             req.flash('msg', 'Data contact berhasil dihapus')
//             res.redirect('/contact')
//         })
//     }
// })

// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama})
    
    res.render('detail', {
        title:'Halaman Contact',
        layout: 'layout/main',
        contact: contact,
    })
})

app.listen(port, () => {
    console.log(`Mongo Contact App | Listening in http://localhost:${port}`)
})