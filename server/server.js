require('./config.js')
const express = require('express')
const { renderHandler } = require('./renderHandler')
const path = require('path')
const server = express()
const Loadable = require('react-loadable')

server.get('/*', renderHandler)

server.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))

Loadable.preloadAll().then(() => {
  server.listen(3000, () => {
    console.log('listening on port 3000')
  })
})

