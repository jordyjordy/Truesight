import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/index.js'
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
if (process.env.NODE_ENV != "production") {
    dotenv.config()
}

import auth from './config/auth.js'

var root = {
    ip: function(args, request) {
        return request.ip
    }
}

import mongoose from "mongoose"
mongoose.set("useCreateIndex", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected to database")
})
let db = mongoose.connection;
db.on('error', ()=> {
    console.error("")
})



var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(auth)
app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root,

    graphiql:true
}))
app.listen(4000)