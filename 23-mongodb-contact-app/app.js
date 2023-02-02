const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express()
const port = 3000

// setup ejs
app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.static('public')) 
app.use(express.urlencoded({extended: true})) 

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

app.listen(port, () => {
    console.log(`Mongo Contact App | Listening in http://localhost:${port}`)
})