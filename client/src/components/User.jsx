import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {

    const {id} = useParams();
    const [user , setUser ] = useState({
        firstName : '',
        email : '',
        posts: []
    }); 
    const [likes , setLikes] = useState();
    const logout = () => {
        axios.post('http://localhost:8000/api/logout' ,{}, {withCredentials : true})
            .then(res => {console.log(res) ; navigate('/')})
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.post('http://localhost:8000/api/one' , {_id : id} , {withCredentials:  true})
            .then(res =>{setUser(res.data) ; 
                        const creatorRequests = res.data.posts.map(post => 
                            axios.get(`http://localhost:8000/api/getonepost/${post}` , {withCredentials : true})            
                        .then(res => res.data)
                        .catch(err => console.log(err)));      
                        Promise.all(creatorRequests)
                            .then( response => { 
                                console.log(response)
                                const allLikes = Array.from(new Set(response.map(post => post ? post.likes : '')))
                                    .map(likers => likers.length);
                                    setLikes(allLikes.reduce(function(a, b) { return a + b; }, 0))
                                })
                            .catch(err => console.log(err))

                    .catch(err => console.log(err))    
                    })
            .catch(err => console.log(err))
        },[])

    return(
        <>
        <div style={{display : 'flex',width : '100%', justifyContent : 'space-between',alignItems : 'center', padding : '15px 20px ', backgroundColor : 'lightblue'}}>
            <h1><Link to={'/bright_ideas'}>Bright ideas</Link></h1>
            <h1 onClick={() => logout()} style={{border : '1px solid whitesmoke' , padding : '9px 14px' , borderRadius : '10px'}} className="logout">Logout</h1>
        </div>
        <div style={{fontSize : '1.2em' , display : 'flex' , flexDirection : 'column' , justifyContent : 'space-evenly' , height : '500px' , alignItems : 'center'}}>
            <p>Name : <span>{user.firstName}</span>
            </p>
            <p>Email : <span>{user.email}</span></p>
            <hr />
            <p>Total number of posts</p>
            <p><span>{user.posts.length}</span></p>
            <p>total number of likes</p>
            <p><span>{likes}</span></p>
        </div>
        
        </>
    )
}

export default User; 