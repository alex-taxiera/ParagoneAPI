const polka = require('polka')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const {
  HOST = '0.0.0.0',
  PORT = '3031'
} = process.env

const app = polka()
const v1 = require('./api/v1')

// app.set('json spaces', 2)

app.use('/v1', v1)

app.listen(PORT, HOST, (error) => {
  if (error) {
    throw error
  }

  console.log(`Listening on port ${PORT}`) // eslint-disable-line
})
