const express = require('express')
const app = express()

const aika = Date()

let persons = [
    {
      name: 'Arto Hellaaaaas',
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

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })