import React from "react";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";

const Main= () => {
    const id = localStorage.getItem('id')
    const [count , setCount ] = useState('');
    const [info , setInfo] = useState('')
    const [name , setName] = useState('');
    const [posts , setPosts ]= useState([]);
    const [creators , setCreators] = useState([]);

    useEffect(() => {     
        axios.post('http://localhost:8000/api/one' , {_id : id} , {withCredentials : true})
            .then(res => {setName(res.data.firstName) })
            .catch(err => console.log(err))
        axios.get('http://localhost:8000/api/getposts' , {withCredentials : true})
            .then(res => { setPosts(res.data); 
                const creatorRequests = res.data.map( post => axios.post('http://localhost:8000/api/one'  , {_id : post.creator} , {withCredentials : true})
                .then(res => res.data)
                .catch(err => console.log(err)));      
                Promise.all(creatorRequests)
                    .then( response => { 
                        const uniqueCreators = Array.from(new Set(response.map(creator => creator._id)))
                            .map(id => response.find(creator => creator._id === id));
                        setCreators(uniqueCreators);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        
    },[count])

    const navigate = useNavigate();
    const logout = () => {
        axios.post('http://localhost:8000/api/logout' ,{}, {withCredentials : true})
            .then(res => {console.log(res) ; navigate('/')})
            .catch(err => console.log(err))
    }
    const handlePost = () => {
        axios.post('http://localhost:8000/api/createPost' , {creator : localStorage.getItem('id') , info } , {withCredentials : true} )
            .then(res =>{ setInfo(''); setCount(!count)})
            .catch(err => console.log(err))
    }

    const handleLike = (postID) => {
        axios.post('http://localhost:8000/api/like' , {creator : id , _id : postID}, {withCredentials : true})
            .then(res => {console.log(res) ;setCount(!count);})
            .catch(err => console.log(err))
    }

    return (
        <>
        <div style={{display : 'flex',width : '100%',alignItems : 'center', justifyContent : 'space-between', padding : '15px 20px ', backgroundColor : '#1f3f3f', marginBottom : '24px'}}>
                <h1 style={{color : 'firebrick'}}>{name}</h1>
                <h1 onClick={() => logout()} style={{border : '1px solid whitesmoke' , padding : '9px 14px' , borderRadius : '10px'}} className="logout">Log out</h1>
            </div>
        <div style={{margin : '0px auto' , width : '80%'}}>
            <div style={{display : 'flex' , alignItems : 'center', placeContent : 'center' ,fontSize : '1.3em'}}>
                <input type="text" placeholder="post something witty here" value={info} onChange={(e) => setInfo(e.target.value)}></input>
                <button onClick={() => handlePost()}> Post</button>
                
            </div>
            <div style={{display : 'flex' , flexDirection : 'column-reverse' , alignItems : 'center', fontSize : '1.2em'}}>
                {posts.map( (post,index) =>{
                    return (
                        <div key={post._id} style={{margin : '10px',borderBottom : '1px solid lightgray', width: '30%', padding: '20px' , display : 'flex', flexDirection : 'column', alignItems : 'center' , justifyContent : 
                        'space-evenly'}}>
                        {post.creator == id  
                        ? <button style={{width : '50%', backgroundColor : 'firebrick' , color: 'whitesmoke' , position : 'relative' , left: '300px', top : '110px'}}  onClick={() => {
                            axios.post('http://localhost:8000/api/delete', {_id : post._id} , {withCredentials : true})
                                .then(res => setCount(!count))
                                .catch(err => console.log(err))
                        }}>Delete</button> 
                        : ''
                        }
                    <p>
                        {creators.map( (item) =>
                            item._id == post.creator ?<Link to={`/user/${item._id}`}>{item.firstName == name ? 'You ' : item.firstName} said : </Link>  : ''
                        )
                        }
                    </p>
                    <p style={{wordWrap : 'break-word', width : '100%'}}>{post.info}</p>
                    <p>This post is liked <Link to={`/29/${post._id}`}>by {post.likes.length}</Link></p>
                    <p>Posted at : {post.createdAt.slice(0,10) }</p>
                    {post.likes.includes(id) 
                    ? <button style={{width : '50%'}} className="liked" onClick={() => handleLike(post._id)}>Unlike</button>
                    : <button style={{width : '50%'}} onClick={() => handleLike(post._id)}>Like</button>
                    }
                    </div>)
                }
                )}
            </div>
        </div>
        </>
    )
}

export default Main