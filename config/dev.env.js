'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SERVER: '"apis"',
  IMG_SERVER: '"http://eshop.xmetadata.com"',
  HOST: '"fashionsneaker.etlobby.com"'
})
