const ParamTypes = require('prop-types')

const enforceParams = (rules) => {
  // Here, we validate the rules against an empty object. In most cases, this
  // validation will fail, due to not specifying required values. However,
  // doing this helps us catch bugs when defining what params to enforce, since
  // we should get console output if we have typos in our definitions.
  // try {
  //   ParamTypes.checkPropTypes(rules, {})
  // } catch (error) {
  //   if (!error.toString().includes('was not specified in')) {
  //     throw error
  //   }
  // }

  return async (req, res) => {
    const unexpectedParams = difference(Object.keys(req.params), Object.keys(rules))

    if (unexpectedParams.length) {
      const message = `Unexpected param(s) ${unexpectedParams.join(', ')}`
      console.error('enforceParams:', message)
      res.error(message)
      return
    }

    try {
      ParamTypes.checkPropTypes(rules, req.params)
    } catch (error) {
      const message = error.toString()
      console.error('enforceParams:', message)
      res.error(message)
    }
  }
}

const difference = (actual, expected) => {
  for (let i = 0; i < expected.length; i++) {
    const rule = expected[i]
    const index = actual.indexOf(rule)
    if (index > -1) {
      actual.splice(index, 1)
    }
  }
  return actual
}

module.exports = enforceParams
