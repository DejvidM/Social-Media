import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Likes = () => {
    const {id} = useParams()
    const [post , setPost ] = useState(
        {
            info : '',
            likes : [],
            createdAt : ''
        }
    );
    useEffect(() => {
        axios.get(`http://localhost:8000/api/getonepost/${id}` ,{withCredentials : true})
            .then(res => {
                const creatorRequests = res.data.likes.map( likes => axios.post('http://localhost:8000/api/one'  , {_id : likes} , {withCredentials : true})
                .then(res => res.data )
                .catch(err => console.log(err)));      
                Promise.all(creatorRequests)
                    .then( response => { const validCreators = response.filter(creator => creator !== null);
                        console.log(validCreators)
                        setPost({...post ,likes : validCreators , info : res.data.info , createdAt : res.data.createdAt});
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    },[])
    const navigate = useNavigate()

    return(
        <>
        <div style={{display : 'flex',width : '100%', justifyContent : 'space-between',alignItems : 'center',padding : '15px 20px ', backgroundColor : 'lightblue'}}>
            <h1><Link to={'/bright_ideas'}>Bright ideas</Link></h1>
            <h1 onClick={() => {axios.post('http://localhost:8000/api/logout' , {} ,{ withCredentials : true} )
                    .then(res => navigate('/'))
                    .catch(err => console.log(err)) 
            }} style={{border : '1px solid whitesmoke' , padding : '9px 14px' , borderRadius : '10px'}} className="logout">Logout</h1>
        </div>

            <p style={{fontSize : '1.5em',textAlign : 'center', width : '75%', margin : '20px auto', border : '1px solid lightgray', padding : '19px', borderRadius : '10px', wordWrap : 'break-word'}}>{post.info}. {<br />}
            Created at : {post.createdAt.slice(0,10)}
            </p>
            
 
            <table style={{border : '2px solid lightgray', margin : '0px auto'}}>
                <tr>
                    <td>
                        Post is liked by
                    </td>
                </tr>
                    {
                    post.likes.map( (person,index) => 
                    <tr key={index}>
                    <td>
                        {person.firstName}
                    </td>
                    </tr>
                    )
                    }
            </table>
        </>
    )
}

export default Likes