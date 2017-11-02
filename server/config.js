process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

require('ignore-styles')

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app'],
  plugins: ['dynamic-import-node', 'react-loadable/babel']
})
