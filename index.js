const express = require('express')
const {connect} = require('./confing/db')
const app = express()

const  {postRoute} = require('./Routes/postsRoute')
const {UserRoute} =  require('./Routes/userRoutes')
app.use(express.json())
const {authenticate} = require('./middleware/authentication')
const cors =require('cors')
require("dotenv").config()
app.use(cors({
  
}))



app.use('/users',UserRoute)
app.use(authenticate)
app.use('/post',postRoute)

app.get('/',(req,res)=>{
res.send('Welcome Home')
})


app.listen(process.env.port,async()=>{
    try{
  await connect
  console.log('Connected to Mongodb')
  console.log(`${process.env.port}`)
    }catch(err){
   console.log(err)
    }
  
})