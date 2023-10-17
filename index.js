const express  = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/apiRoutes.js')
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
require('./db');

app.use('/api', apiRoutes)

app.get('/api/getKey' , (req,res) => {
    res.json({
        key : process.env.RAZORPAY_API_KEY
    })
})

app.use((error,res) => {
    res.json({
        message : error.message
    })
})


const Port = process.env.PORT;
app.listen(Port,() => {
    console.log(`app listen on port ${Port}`)
})
