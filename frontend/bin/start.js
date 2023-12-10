const Webpack = require('webpack')
const express = require('express')
const middleware = require('webpack-dev-middleware')
const childProcess = require('child_process')
const configBuilder = require('../webpack.dev')

const indexFile = process.argv[2]
const config = configBuilder(indexFile)
const compiler = Webpack(config)
const app = express()

const buildSite = async () => {
  return new Promise((resolve, reject) => {
    childProcess.exec('gozet build', (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`error: ${error.message}`))
      }
      if (stderr) {
        reject(new Error(`stderr: ${stderr}`))
      }
      resolve(`stdout: ${stdout}`)
    })
  })
}

app.use(async (request, _response, next) => {
  if (request.url === '/') {
    console.log(await buildSite())
  }
  next()
})

app.use(middleware(compiler, {}))
app.use(require('webpack-hot-middleware')(compiler))
app.listen(3000, () => console.log('Dev server listening on 3000'))
