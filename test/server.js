const express = require("express")
const Vue = require('vue')
const renderer = require('vue-server-renderer').createBundleRenderer()

const app = express()


app.get("/", (req, res) => {
  const vm = new Vue({
    data(){
      return {
        a: "印书勋"
      }
    },
    template: "<div>{{a}}</div>"
  })
  const stream = renderer.renderToStream()
  res.write(`<!DOCTYPE html><html><head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>测试</title></head><body>`)

  stream.on("data", chunk => {
    res.write(chunk)
    console.log(chunk)
  })

  stream.on('end', () => {
    res.end('</body></html>')
    console.log('end')
  })

})

const server = app.listen(3001, () => {
  console.log("listen on " + server.address().port)
})