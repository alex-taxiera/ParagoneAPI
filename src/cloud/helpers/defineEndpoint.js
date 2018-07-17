/* global Parse */

// Allows you to define endpoints with middleware
// similar to Express Middleware: http://expressjs.com/en/guide/using-middleware.html
const defineEndpoint = (name, ...args) => Parse.Cloud.define(name, async (req, res) => {
  for (const func of args) {
    await func(req, res)
  }
})

module.exports = defineEndpoint
