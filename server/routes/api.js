const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')
const jwt = require('jsonwebtoken')

const db = 'mongodb://yz:qaz98765432@ds155213.mlab.com:55213/db1'

mongoose.connect(db, { useNewUrlParser: true },error =>{
    if(error){
        console.error(error)
    }else{
        console.log("connected")
    }
})

function verifyToken(req, res, next) {
    // verify the Json Token 
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
      return res.status(401).send('Unauthorized request');
    }
    try{
        let payload = jwt.verify(token, 'secretKey');
        
        if(!payload) {
            return res.status(401).send('Unauthorized request');
          }
      
        req.userId = payload.userid;
        next();
    }catch(e) {
        // if the token expired 
        // return 401 
        if (e.name === 'TokenExpiredError') {
            return res.status(401).send( e.name);
        }
    }
}


router.post('/register', (req, res) =>{

    let userData = req.body;
    let user = new User(userData);

    let payload = {userid: registeredUser._id,
        exp: Math.floor(Date.now().valueOf() / 1000) + (1209600) };

    let token = jwt.sign(payload, 'secretKey');

    user.token = token

    user.save((error,registeredUser) =>{
        if(error){
            console.log(error);
        }else{
            console.log(registeredUser)             
            res.status(200).send({"status" : 'successful'});
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send('Invalid Email or Password')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Email or  Password');
        } else {
            let payload = {userid: user._id,
                           exp: Math.floor(Date.now().valueOf() / 1000) + (20) }
            let accessToken = jwt.sign(payload, 'secretKey');
            let refreshToken = user.token;
            res.status(200).send({ "status" : 'successful',
                                   "data" : {refreshToken, accessToken} 
                                }); 
        }
      }
    })
  })

  // post
  router.post('/post', verifyToken, (req, res) =>{
    console.log('test')
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


// feed
router.post('/feed', verifyToken, (req, res) =>{
    let pullRequest = req.body;
    let branchReq = pullRequest.branch;
    let count = pullRequest.count;

    if (branchReq == ''){
        Post.find()
            .sort({'last_edited': -1})
            .limit(10)
            .skip(count)
            .exec((error, post) => {
                if (error) {
                console.log(err)    
                }else {
                }res.status(200).send(post)
            });
    }else{
        Post.find({branch: branchReq})
            .sort({'last_edited': -1})
            .limit(10)
            .skip(count)
            .exec((error, post) => {
                if (error) {
                console.log(err)    
                }else {
                }res.status(200).send(post)
            });
    }
})

// search
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
