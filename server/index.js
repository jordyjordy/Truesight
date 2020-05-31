const express = require('express')
const app = express()
const path = require('path')
require('./routes/spells')(app)
const port = 5000

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs');

app.get('/',(req,res) => res.render('index.ejs'))

app.listen(port, () => console.log("Listening on port " + port))