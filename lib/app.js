const express = require('express')
var cors = require('cors')

const app = express()

// Built in middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// App routes
app.use('/api/v1/hooks', require('./controllers/hooks'))

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'))
app.use(require('./middleware/error'))

module.exports = app
