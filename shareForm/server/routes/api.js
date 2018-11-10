const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')

const db = 'mongodb://yz:qaz98765432@ds155213.mlab.com:55213/db1'

mongoose.connect(db, { useNewUrlParser: true },error =>{
    if(error){
        console.error(error)
    }else{
        console.log("connected")
    }
})

// router.get('/', (req, res) =>{
//     res.send('From API route')
// })


router.post('/register', (req, res) =>{

    let userData = req.body;
    let user = new User(userData);
   
    user.save((error,regesitedUser) =>{
        if(error){
            console.log(error)
        }else{
            res.status(200).send(regesitedUser)
        }
    })
})
module.exports = router
