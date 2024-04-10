const Users = require('../controllers/User.controller');
const { authenticate } = require('../config/jwt.config');
const Posts = require('../controllers/Posts.controller')

module.exports = (app) => {
    app.post("/api/register", Users.Register);
    app.post("/api/login", Users.Login); 
    app.post('/api/logout' , Users.Logout)
    app.get('/api/users' , authenticate , Users.getAll)
    app.post('/api/one' ,authenticate, Users.getOne)

    app.get('/api/getposts' , authenticate , Posts.getAllPosts)
    app.get('/api/getonepost/:_id' , authenticate , Posts.getOnePost)
    app.post('/api/createPost', authenticate , Posts.createPost)
    app.post('/api/like', authenticate , Posts.likePost)
    app.post('/api/delete' , authenticate  , Posts.deletePost)
}