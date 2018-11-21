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
    console.log('come in')
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    console.log(token)
    let payload = jwt.verify(token, token.type)
    if(!payload) {
        // access token is not match
      return res.status(401).send('Unauthorized request')    
    }
    console.log('come out ')

    req.userId = payload.userid
    next()
}


router.post('/register', (req, res) =>{
    let userData = req.body;
    let user = new User(userData);

    // generate long life refresh token with 14 days life cycle
    let payload = {userid: user._id,
                   exp: Date.now().valueOf() / 1000 + (1209600),
                   type: 'refreshKey' };
    user.token = jwt.sign(payload, payload.type);

    
    user.save((error,registeredUser) =>{
        if(error){
            console.log(error);
            // add stauts error handle  
        }else{
            console.log(registeredUser,'signup successfully')
            res.status(200).send({status: 'successful', 
                                  data: {}
                                });
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err) 
        // add stauts error handle   
      } else {
        if (!user) {
          res.status(401).send('Invalid Email or Password')
        } else {
            if ( user.password !== userData.password) {
            res.status(401).send('Invalid Email or  Password')
            } else {
                // generate access token with 5 mins (300 sec)
                let payload = {userid: user._id,
                            exp: Date.now().valueOf() / 1000 + (300),
                            type: 'accessKey' };
                let accessToken = jwt.sign(payload, payload.type);
                console.log(accessToken);
                res.status(200).send({status: 'successful',
                                    data: {refreshToken: user.token,
                                            accessToken: accessToken}
                                    });
            }
        }
      }
    })
  })

  // post
  router.post('/post', verifyToken, (req, res) =>{
    let postData = req.body;
    let post = new Post(postData);
   
    post.save((error,postedPost) =>{
        if(error){
            console.log('HERE',error)
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



module.exports = router
