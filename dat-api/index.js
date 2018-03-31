const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const log = console.log

const server = restify.createServer()
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})
 
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

server.get('/ping', (req, res) => res.send(200, {result: true, data: 'pong'}))

server.post('/user/add', (req, res) => {
    console.log("req.body:", req.body)
    setTimeout(()=> res.send(200, {result: true}), 2000)  
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})