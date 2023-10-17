const express = require('express')
const {sendOtptoMail} = require('../Controllers/productController')
const routes = express.Router();

routes.get('/sendOtp' , sendOtptoMail)


module.exports =  routes