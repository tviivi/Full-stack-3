const mongoose = require('mongoose')

const url = 'mongodb://fullstack:*****@ds229448.mlab.com:29448/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person