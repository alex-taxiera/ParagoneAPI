/* global Parse */
const defineEndpoint = require('./helpers/defineEndpoint.js')
const ParamTypes = require('prop-types')
const enforceParams = require('./middleware/enforceParams.js')

defineEndpoint('echo',
  enforceParams({
    message: ParamTypes.string.isRequired
  }),
  (req, res) => {
    res.success(req.params.message)
  }
)
