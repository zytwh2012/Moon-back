const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')

const db = 'mongodb://yz:qaz98765432@ds155213.mlab.com:55213/db1'

mongoose.connect(db, { useNewUrlParser: true },error =>{
    if(error){
        console.error(error)
    }else{
        console.log("connected")
    }
})


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

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email or Password')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Email or  Password')
        } else {
          res.status(200).send(user)
        }
      }
    })
  })

  // post
  router.post('/post', (req, res) =>{
    let postData = req.body;
    let post = new Post(postData);
   
    post.save((error,postedPost) =>{
        if(error){
            console.log(error)
        }else{
            res.status(200).send(postedPost)
        }
    })
})

// // main page feed
// router.post('/feed', (req, res) =>{

//     let pullRequest = req.body;

//     Post.find()
//         .sort({'last_edited': -1})
//         .limit(10)
//         .exec((err, user) => {
//         if (err) {
//           console.log(err)    
//         } else {

//         }

//     })

// // branch feed
// router.post('/branch_feed', (req, res) =>{

//     let pullRequest = req.body;
//     Post.find({email: userData.email}, (err, user) => {
//         if (err) {
//           console.log(err)    
//         } else {

//         }

//     })

// router.post('/pull', (req, res) =>{

//     let userData = req.body;
//     let user = new User(userData);
   
//     user.save((error,regesitedUser) =>{
//         if(error){
//             console.log(error)
//         }else{
//             res.status(200).send(regesitedUser)
//         }
//     })
// })
module.exports = router
