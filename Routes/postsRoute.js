const express = require('express')
const {Postmodel} = require('../modules/posts')
const postRoute=express.Router()

postRoute.get('/',async(req,res)=>{
try{
    const posts = await Homemodel.find()
    res.send(posts)
    console.log(posts)
}catch(err){
    res.send('Something went Wrong')
    console.log(err)
}
})

postRoute.post("/top",async(req,res)=>{
    const payload = req.body
   try{
   const post = new Postmodel(payload)
   await post.save()
   res.send('Top Post')

   }catch(err){
  console.log(err)
  res.send('Error while posting')
   }
})

postRoute.patch('/update/:id',async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const post = await Postmodel.findOne({'_id':id})
    const userID_in_post = post.userID
    const userID_making_req = req.body.userID

    try{
        if(userID_in_post!==userID_making_req){
           res.send({"mas":"You are not Authorized"})
        }else{
            await Postmodel.findByIdAndUpdate({'_id':id},payload)
            res.send('Updated posts')
        }
        
    }catch(err){
        console.log(err)
        res.send({'msg':"Something went wrong"})
    }
   
})


postRoute.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    try{
     await Postmodel.findByIdAndDelete({"_id":id})
     res.send('Deleted the post')
    }catch(err){
    console.log(err)
    res.send({"msg":'Somethin went wrong'})
    }

})


module.exports={
    postRoute
}