import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../client/src/App'
import { StaticRouter } from 'react-router'
import path from 'path'
import fs from 'fs'
import { Provider } from 'react-redux'
import { storeFactory } from '../client/src/store/createStore'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../client/build/react-loadable.json'

const htmlFile = path.resolve(__dirname, '..', 'client', 'build', 'index.html')
const html = fs.readFileSync(htmlFile, 'utf8')

const initialState = {
  user: { name: 'Hamid Tondkaran' }
}

const setInitialState = `
<script>
window._PRELOADED_STORE_= ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
</script>`

const generateMarkup = url => {
  const context = {}
  const store = storeFactory(initialState)

  const modules = []

  const reactMarkup = renderToString(
    <Provider store={store}>
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter location={url} context={context}>
          <App />
        </StaticRouter>
      </Loadable.Capture>
    </Provider>
  )

  let bundles = getBundles(stats, modules)

  return { bundles, reactMarkup }
}

export const renderHandler = (req, res, next) => {
  if (isStaticAsset(req.url)) {
    next()
  } else {
    const { bundles, reactMarkup } = generateMarkup(req.url)

    const bundleScriptTags = bundles
      .map(bundle => {
        return `<script src="/${bundle.file}"></script>`
      })
      .join('\n')

    const finalMarkup = html
      .replace('{markup}', reactMarkup)
      .replace('{redux}', setInitialState)
      .replace('{bundles}', bundleScriptTags)
      .replace('{runner}', '<script>window.main()</script>')

    res.send(finalMarkup)
  }
}

const isStaticAsset = url => url.includes('static')
