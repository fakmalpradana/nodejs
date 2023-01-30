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
app.use(express.static('public'))

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

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layout/main'
    })
  })

app.get('/contact', (req, res) => {
    const contacts = loadContact()
    
    res.render('contact', {
        title:'Halaman Contact',
        layout: 'layout/main',
        contacts: contacts,
    })
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    
    res.render('detail', {
        title:'Halaman Contact',
        layout: 'layout/main',
        contact: contact,
    })
})

app.use((req, res) => {
    res.status(404)
    res.send('<h1>Page not found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})