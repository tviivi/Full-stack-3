const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const url = 'mongodb://fullstack:*****@ds229448.mlab.com:29448/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

app.use(cors())

morgan.token('data', function (req, res) {
  return (JSON.stringify({ "name": req.body.name, "number": req.body.number }))
})

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())
app.use(express.static('build'))

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person.id
  }
}

const aika = Date()
function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min
}

let persons = [
    {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    {
      name: 'Martti Tienari',
      number: '040-123456',
      id: 2
    },
    {
      name: 'Arto Järvinen',
      number: '040-123456',
      id: 3
    },
    {
      name: 'Lea Kutvonen',
      number: '040-123456',
      id: 4
    }
  ]
  
  app.get('/api/persons', (request, response) => {
    Person
    .find({})
    .then(persons => {
      response.json(persons.map(formatPerson))
    })
  })

  app.get('api/info', (req, res) => {
    res.send(`puhelinluettelossa ${persons.length} henkilön tiedot <p>${aika}</p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )

    if (person) {
    response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
    if (body.number === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
    if (persons.find(x => x.name === body.name) != null) {
      return response.status(400).json({error: 'name must be unique'})
    }

    const person = {
      name: body.name,
      number: body.number,
      id: getRandomArbitrary(0, 500)
    }

    persons = persons.concat(person)

    response.json(person)
  })

  const PORT = process.env.PORT ||3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })