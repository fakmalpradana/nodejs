const mongoose = require('mongoose')

const username = 'fakmalpradana'
const password = 'Akmal2001'

const uri = `mongodb+srv://${username}:${password}@cluster0.hrgzhh5.mongodb.net/test?retryWrites=true&w=majority`

mongoose.set('strictQuery', true)
mongoose.connect(uri)

// membuat schema
const Contact = mongoose.model('Contact', {
    nama: {
        type: String,
        required: true,
    },
    noHP: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    }
})

// menambah 1 data
const contact1 = new Contact({
    nama: 'Pradana',
    noHP: '082112243892',
    email: 'pradana@gmail.com'
})

// simpan ke collection
contact1.save().then((contact) => console.log(contact))