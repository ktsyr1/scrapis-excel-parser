const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const Api = require('./res/api')
app.use('/api', Api)

const port = 5000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})