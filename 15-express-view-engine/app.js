
const express = require('express')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
  })

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/produk/:id', (req, res) => {
    res.send(`produk id : ${req.params.id} <br> produk category : ${req.query.cat}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>Page not found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})