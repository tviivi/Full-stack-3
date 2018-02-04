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

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })