const expressLayout = require('express-ejs-layouts')
const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third party middleware
app.use(expressLayout)
app.use(morgan('dev'))

// Aplication level middleware
app.use((req, res, next) => {
    console.log('Time : ', Date.now())
    next()
})

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
    res.render('contact', {
        title:'Halaman Contact',
        layout: 'layout/main'
    })
})

app.get('/produk/:id', (req, res) => {
    res.send(`produk id : ${req.params.id} <br> produk category : ${req.query.cat}`)
})

app.use((req, res) => {
    res.status(404)
    res.send('<h1>Page not found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})