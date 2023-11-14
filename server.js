const express = require( "express");
import cors from 'cors'
var bodyParser = require('body-parser')
require('dotenv').config();
const authRouter = require( './src/router/authRoute'); 
// 
const port  = process.env.PORT || 4000;
const app = express()
// middleware
app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.json())

// apis
app.use('/api/auth', authRouter)



app.listen(port, () => {
    console.log('connect success on '+ port)
})