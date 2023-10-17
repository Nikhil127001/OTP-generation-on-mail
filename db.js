const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to MONGODB database');
}).catch((err) =>{
    console.log('Database error', err)
})