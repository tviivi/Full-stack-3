const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const aika = Date()
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
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
  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    res.send(`puhelinluettelossa ${persons.length} henkilön tiedot <p>${aika}</p>`)
  })

  app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )

    if (person) {
    response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id = getRandomArbitrary(0, 5000)
  
    persons = persons.concat(person)

    response.json(person)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })