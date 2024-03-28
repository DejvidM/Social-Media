import React from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";

const Main= () => {
    const id = localStorage.getItem('id')
    const [count , setCount ] = useState('');
    const [info , setInfo] = useState('')
    const [name , setName] = useState('');
    const [posts , setPosts ]= useState([]);
    useEffect(() => {     
        axios.post('http://localhost:8000/api/one' , {_id : id} , {withCredentials : true})
            .then(res => {setName(res.data.firstName) })
            .catch(err => console.log(err))
        axios.get('http://localhost:8000/api/getposts' , {withCredentials : true})
            .then(res => { setPosts(res.data)})
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

    return (
        <>
        <div>
            <h1>{name}</h1>
            <h1 onClick={() => logout()}>Log out</h1>

            <input type="text" placeholder="post something witty here" value={info} onChange={(e) => setInfo(e.target.value)}></input>
            <button onClick={() => handlePost()}> Post</button>
            <div style={{display : 'flex' , flexDirection : 'column-reverse'}}>
                {posts.map( post =>{
                    return (
                    <div key={post._id}>
                    <p  style={{margin :'20px'}}>{post.info}</p>
                    {post.creator == id 
                    ? <button style={{width : '100px'}} onClick={() => {
                        axios.post('http://localhost:8000/api/delete', {_id : post._id} , {withCredentials : true})
                            .then(res => setCount(!count))
                            .catch(err => console.log(err))
                    }}>Delete</button> 
                    : ''
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