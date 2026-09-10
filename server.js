const express = require('express')
const app = express()

//routes

//at home page route, given request parameter, handle response
app.get('/', (req, res) => {
    res.send('Hello NODE API')
}) 

//run page on localhost 3000 
app.listen(3000, () => {
    console.log('node api app is running on port 3000')
})



