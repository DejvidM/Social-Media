import React, { useEffect } from "react";
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
        email : {
            message :''
        },
        password : {
            message : ''
        },
        confirm : ''
    });

    useEffect(() => {
        setErrors({
            firstName : '',
            lastName : '',
            email : {
                message : ''
            },
            password : {
                message : ''
            },
            confirm : ''
        })
    },[state])

    const handleLogin = (e) => {
        e.preventDefault()
    }
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register' , user ,{withCredentials : true} )
            .then(res => {console.log(res) ; localStorage.setItem('id' , res.data.user._id); navigate('/bright_ideas')})
            .catch(err => {err.response.data.errors ? setErrors(err.response.data.errors) : console.log(err) })
    }
    const logIn = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/login' , {email : user.email.message , password : user.password.message} , {withCredentials : true})
            .then(res => {console.log(res) ; localStorage.setItem('id' , res.data.user._id); navigate('/bright_ideas')})
            .catch(err => {err.response ? setErrors({...errors , email : {message : err.response.data}}) : '' ; console.log(err) })
    }

    return (
        <>  
        {state ? 
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-5">
            <div className="card" style={{margin: '30px 0px' , padding : '10px'}}>
            <h2 className="card-title text-center">Login </h2>   
                <div className="card-body py-md-4">
                <form _lpchecked="1" onSubmit={logIn}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder='Email' value={user.email.message} onChange={(e) => setUser({...user, email : {message : e.target.value}})}/>
                    </div>
                    {errors.email.message
                    ? <p style={{color : 'red'}}>{errors.email.message}</p>
                    : ''        
                    }                
            <div className="form-group">
                <input type="password" className="form-control" id="password" placeholder="Password" value={user.password.message} onChange={(e) => setUser({...user, password : {message : e.target.value}})}/>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between" style={{margin : '5px'}}>
                <a className='btn btn-secondary' onClick={() => setState('')}>Register</a>
                <button className="btn btn-primary" type="submit" >Login</button>
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
        <div className="card" style={{margin: '30px 0px' , padding : '10px'}}>
            <h2 className="card-title text-center">Register </h2>   
            <div className="card-body py-md-4">
            <form _lpchecked="1" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="name" placeholder="Name" value={user.firstName} onChange={(e) => setUser({...user, firstName : e.target.value})}/>
                </div>
                {errors.firstName
                ? <p style={{color : 'red'}}>{errors.firstName.message} !</p>
                : ''}
                <div className="form-group">
                    <input type="text" className="form-control" id="Last name" placeholder="Last name" value={user.lastName} onChange={(e) => setUser({...user, lastName : e.target.value})}/>
                </div>
                {errors.lastName
                ? <p style={{color : 'red'}}>{errors.lastName.message} !</p>
                : ''}
                <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder="Email" value={user.email} onChange={(e) => setUser({...user, email : e.target.value})}/>
                </div>
                {errors.email.message
                ? <p style={{color : 'red'}}>{errors.email.message} !</p>
                : ''}
        <div className="form-group">
            <input type="password" className="form-control" id="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password : e.target.value})}/>
        </div>
        {errors.password.message
                ? <p style={{color : 'red'}}>{errors.password.message} !</p>
                : ''}
        <div className="form-group">
            <input type="password" className="form-control" id="confirm-password" placeholder="confirm-password" value={user.confirm} onChange={(e) => setUser({...user, confirm : e.target.value})}/>
        </div>
        {errors.confirm
                ? <p style={{color : 'red'}}>{errors.confirm.message} !</p>
                : ''}
        <div className="d-flex flex-row align-items-center justify-content-between" style={{margin: '5px'}}>
            <a className="btn btn-secondary" onClick={() => setState(true)}>Login</a>
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