require("dotenv").config();
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/error-handler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', routes)
app.use('/', errorHandler)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})