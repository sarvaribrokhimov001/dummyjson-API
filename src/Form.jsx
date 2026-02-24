import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/form.css"

const Form = () => {
 const [username , setUsername] = useState('emilys');
 const [password , setPassword] = useState('emilyspass');
 const [loading , setLoading] = useState(false)

 const [response , setResponse] = useState({});

 const handleUsername = (e) => {
    setUsername(e?.target?.value.trim())
 }

const user = {
    username: username,
    password: password,
    expiresInMins: 30
}

const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    axios
    .post('https://dummyjson.com/auth/login' , user)
    .then(data => {
        if(data?.status === 200) {
            toast.success('Login successfully' , {
                autoClose: 500,
                position: "bottom-right",
            })

            setResponse(data?.data);
            setLoading(false)

            localStorage.setItem('accessToken' , data?.data?.accessToken)
            localStorage.setItem('refreshToken' , data?.data?.refreshToken)
            
        } 
    }).catch(error => {
        console.log(error);
        toast.error(error);
    })
}

const {id , email , username: responseusername , image , firstName , lastName} = response;

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Write some text' value={username} onChange={handleUsername}/>
            <input type="password" placeholder='write your password' value={password} onChange={(e) => {
                setPassword(e?.target?.value.trim())
            }}/>

            <button disabled = {loading} type='submit'> {loading ? 'Loading....' : "Submit"} </button>
        </form>

<div>
    <p>id: {id}</p>
     <h1>firstName: {firstName}</h1>
    <h1>lastName:   {lastName}</h1>
    <p>responseUsername:   {responseusername}</p>
    <p>Email: {email}</p>
    <img src={image} alt="" />
</div>
    </div>
  )
}
export default Form