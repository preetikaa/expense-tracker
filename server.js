const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/connectDb')
require('colors')

//config file
dotenv.config();

//database
connectDb()

  
//rest object
const app = express()
app.disable("etag")

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
//user route
app.use('/api/v1/users', require('./routes/userRoute'))

//transaction route
app.use("/api/v1/transactions", require('./routes/transactionRoute'))

//port
const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})