import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router"; 
import { setValues } from '../Utilities/Info';

function Login() {
  const navigate = useNavigate(); 

  async function handleLogin(e) {
    e.preventDefault();
    
    // get values from form
    const username = e.target.username.value;
    const password = e.target.password.value;
    const number = e.target.number.value;

    const formData = { username, password, number };

    try {
        const res = await axios.post("http://localhost:5000/user/login", formData , {
            withCredentials : true
        });
        
        // 1. Check if login was actually successful
        if (res.data.redirect) { 
            // ✅ Only save values if login worked!
            setValues(username, number);
            
            alert(res.data.message + " 🎉");
            navigate("/"); 
        } else {
            // ❌ Login failed (wrong password/user)
            alert(res.data.message + " ⚠️");
            navigate("/signup"); 
        }

    } catch (error) {
        alert("Server is offline or unreachable 🚨");
        console.log("Login Error:", error);
    } 
  }

  return (
    <>
        <h1>Login Page 🔐</h1>
        <form className='login-form' onSubmit={handleLogin}>
            <input type="text" name="username" placeholder='username' required />
            <input type="password" name="password" placeholder='password' required /> 
            {/* Make number required if your backend expects it for the search */}
            <input type="text" name="number" placeholder='number' required />
            <button type='submit'>Login</button>
        </form>
    </>
  )
}

export default Login;