import React from "react";
import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Register = () => {

    const [state , setState ] = useState('');
    const [user , setUser] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirm : ''
    })

    const [errors , setErrors] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirm : ''
    });

    const handleLogin = (e) => {
        e.preventDefault()
    }
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register' , user ,{withCredentials : true} )
            .then(res => {console.log(res) ; localStorage.setItem('id' , res.data.user._id); navigate('/bright_ideas')})
            .catch(err => {console.log(err.response.data.errors) })
    }

    return (
        <>  
        {state ? 
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-5">
            <div className="card">
            <h2 className="card-title text-center">Login </h2>   
                <div className="card-body py-md-4">
                <form _lpchecked="1" onSubmit={handleLogin}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder='Email' value={user.email} onChange={(e) => setUser({...user, email : e.target.value})}/>
                                        </div>
                                    
            <div className="form-group">
                <input type="password" className="form-control" id="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password : e.target.value})}/>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between">
                <a onClick={() => setState('')}>Register</a>
                                            <button className="btn btn-primary" type="submit">Create Account</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
            </div>
            </div>
            
        :
        <div className="container">
        <div className="row justify-content-center">
        <div className="col-md-5">
        <div className="card">
            <h2 className="card-title text-center">Register </h2>   
            <div className="card-body py-md-4">
            <form _lpchecked="1" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="name" placeholder="Name" value={user.firstName} onChange={(e) => setUser({...user, firstName : e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="Last name" placeholder="Last name" value={user.lastName} onChange={(e) => setUser({...user, lastName : e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder="Email" value={user.email} onChange={(e) => setUser({...user, email : e.target.value})}/>
                                    </div>
                                    
                                
        <div className="form-group">
            <input type="password" className="form-control" id="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password : e.target.value})}/>
        </div>
        <div className="form-group">
            <input type="password" className="form-control" id="confirm-password" placeholder="confirm-password" value={user.confirm} onChange={(e) => setUser({...user, confirm : e.target.value})}/>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between">
            <a onClick={() => setState(true)}>Login</a>
                                        <button className="btn btn-primary" type="submit">Create Account</button>
                </div>
            </form>
            </div>
        </div>
        </div>
        </div>
        </div>
        }
        </>
    )
}

export default Register;