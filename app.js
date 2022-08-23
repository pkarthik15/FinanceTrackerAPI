const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()


const PORT = process.env.PORT || 5000;



const errorHandler = require('./middlewares/errorMiddleware')



const app = express()



app.use(express.json())
app.use(cors()) 
app.use(errorHandler)




app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/account', require('./routes/accountRoute'))



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to db & listening on port', PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
