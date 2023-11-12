

const express = require( "express");
import cors from 'cors'
const authRouter = require( './src/router/authRoute'); 
const port  = process.env.PORT || 4000;
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', authRouter)



app.listen(port, () => {
    console.log('connect success on '+ port)
})