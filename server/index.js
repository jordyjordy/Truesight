import express from "express"
const app = express()
import http from "http"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
if (process.env.NODE_ENV != "production") {
    dotenv.config()
}
import {createSocket, handleUpgrade} from "./websocket.js"

import {spells} from "./routes/spells.js"
import {characters} from "./routes/characters.js"
import {user} from "./routes/user.js"
import {items} from "./routes/items.js"
import {campaigns} from "./routes/campaigns.js"
import {logs} from "./routes/logs.js"

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
app.use('/campaigns',campaigns)
app.use('/logs', logs)
var server = http.createServer(app)
createSocket()
server.on('upgrade', (request, socket, head) => {
    handleUpgrade(request, socket, head)
})
server.listen(port, () => console.log("Listening on port " + port))