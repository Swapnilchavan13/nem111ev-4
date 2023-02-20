const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    gender:Number,
    age:Number,
    city:String,
})


const Usermodel = mongoose.model('users',userSchema)

module.exports={
    Usermodel
}