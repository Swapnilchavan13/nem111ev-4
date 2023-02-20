const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Usermodel } = require('../modules/login')
const UserRoute = express.Router()

UserRoute.post('/register', async (req, res) => {
    const {name,email,city,gender,password,age} = req.body
    try {
        bcrypt.hash(password,5,async (err, hash_passwordword)=> {
            
            if(err){
                console.log(err)
            }else{
                const user = new Usermodel({name,email,gender,city,password:hash_passwordword,age})
                await user.save()
                res.send('Registered')
            }
        });
      

    } catch (err) {
        console.log(err)
        response.send('Error While Registering')
    }
})


UserRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
  
    try {
        const user = await Usermodel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password,user[0].password, (err, result)=> {
                if(result){
                    var token = jwt.sign({userID:user[0]._id}, 'masai');
                    res.send({"msg":'Login Successful',"token":token})
                }else{
                    res.send('Wrong Credentials')
                }
            });
            
        } else {
            res.send('login Fail')
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = {
    UserRoute
}