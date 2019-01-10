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
        console.log("1")
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];

    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    try {
        let payload = jwt.verify(token, 'secretKey');
        req.userId = payload.userid;
    } catch (e){
        return res.status(401).send('Unauthorized request');
    }
    next();
}


router.post('/register', (req, res) =>{

    let userData = req.body;
    let user = new User(userData);

    let payload = {userid: user._id,
                exp: Math.floor(Date.now().valueOf() / 1000) + (1209600)};

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
                        exp: Math.floor(Date.now().valueOf() / 1000) + (600)}
            let accessToken = jwt.sign(payload, 'secretKey');

    
            let repayload = {userid: user._id,
                exp: Math.floor(Date.now().valueOf() / 1000) + (1209600)};

            let retoken = jwt.sign(repayload, 'secretKey');
            user.token = retoken
            refreshToken = user.token;
            User.updateOne({_id: user._id },
                        {'token': refreshToken},
                        (err) => {
                            if(err) throw err
                        });

            res.status(200).send({ "status" : 'successful',
                                   "data" : {refreshToken, accessToken} 
                                }); 
        }
      }
    })
  })

  // post
  router.post('/post', verifyToken,(req, res) => {
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

// search and return post by id
// req.body format example: {"id": "fbdf6d02d99fc261be410adac1e60396"}
router.post('/search/post', verifyToken, (req, res) => {
    Post.findOne(req.body)
        .exec( (error, post) =>{
            if (error) {
                console.log(error,'error')    
            }else {
            }
            return res.status(200).send(post)
        })
})


// search and return user by user's email
// req.body format example: {"email": "test1@qq.com"}
router.post('/search/user', verifyToken, (req, res) => {
    User.findOne(req.body)
        .exec( (error, user) =>{
            if (error) {
                console.log(error,'error')    
            }else {
            }
            return res.status(200).send(user)
        })
})

// feed
router.post('/feed', verifyToken, (req, res) =>{
    let pullRequest = req.body;
    let branchReq = pullRequest.branch;
    let count = pullRequest.count;
    if (branchReq == ''){
        Post.find()
            .sort({'lastEdited': -1})
            .limit(10)
            .skip(count)
            .exec((error, post) => {
                if (error) {
                console.log(error,'error')    
                }else {
                }
                return res.status(200).send(post)
            });
    }else{
        Post.find({branch: branchReq})
            .sort({'lastEdited': -1})
            .limit(10)
            .skip(count)
            .exec((error, post) => {
                if (error) {
                console.log(err,'error')    
                }else {
                }
                return res.status(200).send(post)
            });
    }
})


router.get('/token', verifyToken, (req, res) => {
    let payload = {userid: req.userId,
        exp: Math.floor(Date.now().valueOf() / 1000) + (600)}
    let accessToken = jwt.sign(payload, 'secretKey');
    return res.status(200).send({ "status" : 'successful', 
                                "data" : {accessToken}})
})

module.exports = router
