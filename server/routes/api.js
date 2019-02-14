const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const pComment = require('../models/comment')
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
    try {
        let payload = jwt.verify(token, 'secretKey');
        req.userId = payload.userid;
    } catch (e){
        return res.status(401).send('Unauthorized request');
    }
    next();
}


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

router.delete('/posts/delete', verifyToken, (req, res) => {
    let postId = req.body._id;
    Post.findByIdAndDelete(postId)
        .exec( (error, deletedPost) =>{
            if (error) {
                console.log(error,'error')   
                return res.status(404).send() 
            }else {
                pComment.deleteMany({root : postId})  
                .exec( (error, deletedComments) =>{
                if (error) {
                    console.log(error,'error')   
                    return res.status(404).send() 
                }else {
                    return res.status(200).send(deletedComments)
                }
                })
            }
        })
})

// update
router.put('/posts/update/:id', verifyToken,(req, res) => {
    let query= req.body;
    Post.findOneAndUpdate({_id : req.param.id},query, function (err, doc) {
         if(err){
            console.log(err)
        }else{
            return res.status(200).send(doc)
        }
    })
})

// search and return post by id
// req.body format example: {"id": "fbdf6d02d99fc261be410adac1e60396"}
router.post('/post/search', verifyToken, (req, res) => {
    Post.findOne(req.body)
        .exec( (error, post) =>{
            if (error) {
                console.log(error,'error')    
            }else {
                return res.status(200).send(post)
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


/* token relative method */

router.get('/token', verifyToken, (req, res) => {
    let payload = {_id: req._id,
        exp: Math.floor(Date.now().valueOf() / 1000) + (600)}
    let accessToken = jwt.sign(payload, 'secretKey');
    return res.status(200).send({ "status" : 'successful', 
                                "data" : {accessToken}})
})




/* following are user api method  */


// search and return user by user's email
// req.body format example: {"email": "test1@qq.com"}
router.post('/user/search', verifyToken, (req, res) => {
    User.findOne(req.body)
        .exec( (error, user) =>{
            if (error) {
                console.log(error,'error')    
            }else {
                return res.status(200).send(user)
            }
        })
})


// create new user
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


// login, validate user information

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

/** following are comment api method */

// add a pcomment
router.post('/comment', verifyToken,(req, res) => {
    let pcommentData = req.body;
    let pcomment = new pComment(pcommentData);
    
    pcomment.save((error,pcommentData) =>{
        if(error){
            console.log(error)
        }else{
            res.status(200).send(pcommentData)
        }
    })
})

// add a pcomments, this is only for admin 
router.post('/comments', verifyToken,(req, res) => {

    let pcommentsData = req.body.commentsData;
    pcommentsData.forEach(pcommentData => {
        var comment = new pComment(pcommentData);

        comment.save((error, ) =>{
            if(error){
                console.log(error)
            } 
        })
    })
    res.status(200).send({'status': 'successful'})
})



// search and return pcomment by id
router.get('/comment/search', verifyToken, (req, res) => {
    // /comment/search?depth=1&id=1234555
    pComment
    .findOne({ _id: req.query._id })
    .populate('children')
    .exec(function (err, comment) {
      if (err) return handleError(err);
      console.log(comment);
    })

    // // recursive find comments
    // pComment.findOne({id:commentId})
    //     .exec( (error, pcomment) =>{
    //         if (error) {
    //             console.log(error,'error')    
    //         }else {
    //             result = searchComment(pcomment,0,depth)
    //             return res.status(200).send(result)
    //         }
    //     })
})


// function deepCommentDelete(comment) {
//     comment.children.forEach( childId =>{

//        pComment.findOne({id: childId}, function(err, child){
//            if (err) {
//                console.log(err);
//            } else {
//                 deepCommentDelete(child);
//                 pComment.deleteOne({id: child.id}, function(err){
//                     if (err) {
//                         console.log(err)
//                     }
//                 })
//            }
//        })
//     })
// }


// function searchComment(comment,currentDepth,maxDepth) {
//     // comment pComment object
//     // currentDepth int,  maxDepth int
//     var temp = {
//         id: comment.id,
//         commentOwnerId: comment.commentOwnerId,
//         commentContent: comment.commentContent,
//         lastEdited: comment.lastEdited,
//         parent: comment.parent,
//         root: comment.root,
//         children: []
//     }
//     if (currentDepth < maxDepth) {
//         comment.children.forEach( childId =>{
//             pComment.findOne({id: childId}, function(err, child){
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     childObj = searchComment(child,currentDepth+1,maxDepth)
//                     temp.children.push(childObj);
//                 }
//             }).exec
//         })
//     }
//     return temp
// }



// // delete pcomment by id
// router.delete('/comment/delete', verifyToken, (req, res) => {
//     // when delete comments. its parent should update its children
//     let commentId = req.body.id;
//     // find parent
//     pComment.findOne({id:commentId}).exec(
//         (err, comment) => {
//             if (comment) {
//                 deepCommentDelete(comment)
//                 // if parent is Post
//                 if (comment.parent == comment.root ) {
//                     Post.findOne({id:comment.parent}).exec(
//                         err, parent =>{
//                             if (parent) {
//                                 Post.updateOne(
//                                     {id: parent.id},
//                                     {comment: parent.comment.filter(
//                                         function(value){
//                                             return value != comment.id;
//                                         }
//                                     )},
//                                     (err) => { if (err) { console.log(err)} }
//                                 )
//                             }
//                             if (err) {
//                                 console.log(err)
//                             }
//                         }
//                     )
//                 } else {
//                     // parent is still comment
//                     pComment.findOne({id:comment.parent}).exec(
//                         (err, parent) =>{
//                             if (parent) {
//                                 pComment.updateOne(
//                                     {id: parent.id},
//                                     {children: parent.children.filter(
//                                         function(value){
//                                             return value != comment.id;
//                                         }
//                                     )},
//                                     err => { if (err) { console.log(err)} }
//                                 )
//                             }
//                             if (err) {console.log(err)}
//                         }
//                     )                   
//                 }
 
//             // delete comment itself
//             pComment.deleteOne({id :commentId})
//                 .exec( (err) =>{
//                     if (err) {
//                         console.log(err,'error')   
//                         return res.status(404).send() 
//                     }else {
//                         return res.status(200).send({'status': 'successful'}) 
//                     }
//                 })
//             }
//         }
//     )
// })







// module.exports = router
