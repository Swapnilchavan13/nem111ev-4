const mongoose = require('mongoose')

const posts_Schema=mongoose.Schema({
    title:String,
    body:String,
    device :String,
    no_if_comments :Number
})

const Postmodel = mongoose.model('posts',posts_Schema)

module.exports={
    Postmodel
}