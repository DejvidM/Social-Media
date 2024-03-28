const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    info : {
        type : String,
        required : [true , 'is required']
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
}, {timestamps: true});

const Posts = mongoose.model('Posts' , PostsSchema);
module.exports = Posts; 