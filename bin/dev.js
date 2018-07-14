const nodemon = require('nodemon')

try {
  nodemon({
    script: 'index.js',
    ext: 'js',
    watch: '.'
  })
} catch (e) {
  console.error(e.message, e.stack)
}
