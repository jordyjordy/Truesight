const express = require('express')
const app = express()
const http = require('http')
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require('cors')
if (process.env.NODE_ENV != "production") {
    const dotenv = require('dotenv')
    dotenv.config()
}
const websocket = require('./websocket')

var spells = require('./routes/spells')
var characters = require('./routes/characters')
var user = require('./routes/user')
var items = require('./routes/items')
mongoose.set("useCreateIndex", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected to database")
})
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/spells', spells)
app.use('/characters', characters)
app.use('/user', user)
app.use('/items', items)


var server = http.createServer(app)
websocket.createSocket()
server.on('upgrade', (request, socket, head) => {
    websocket.handleUpgrade(request, socket, head)
})
server.listen(port, () => console.log("Listening on port " + port))