/* global Parse */
const ParamTypes = require('prop-types')
const enforceParams = require('./middleware/enforceParams.js')

Parse.Cloud.define('echo',
  (req, res) => {
    res.send('yolo')
  }
)
