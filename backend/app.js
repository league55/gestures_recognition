const PORT = 3300
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {appendLines} = require("./public/javascripts/csv");
const app = express()

app.use(bodyParser.json()) // note: this is before the route
app.use(cors())

app.post('/data', (req, res) => {
  console.log(req.body);
  appendLines(req.body);
  res.sendStatus(200);
})

app.use(express.json())

console.log(`Listen on port ${PORT}`)
app.listen(PORT)
