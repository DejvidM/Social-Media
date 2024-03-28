const Posts = require('../models/Posts.model')
const User = require('../models/User.model')

module.exports.createPost = ( req , res ) => {
    User.findOne({_id : req.body.creator})
        .then( user => {
            Posts.create(req.body)
                .then(  post => { 
                        user.posts.push(post._id) ; 
                        res.json(post) ; 
                        user.save({validateBeforeSave : false}) 
                    })
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.json(err))
}

module.exports.likePost = (req ,res ) => {
    Posts.findOne({ _id : req.body._id})
        .then( post => {
            post.likes.push(req.body.creator)
            res.json(post)
            post.save({validateBeforeSave : false})
        })
        .catch(err => res.json(err))
}

module.exports.deletePost = (req , res ) => {
    Posts.deleteOne({_id : req.body})
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err))
}

module.exports.getAllPosts = (req ,res ) => {
    Posts.find()
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
    }