import React from 'react';
import "./register.scss";
import { Link } from 'react-router-dom';
import axios from "axios";
function Register() {

const [input,setInput]=React.useState({
  username:"",
  email:"",
  password:"",
  name:"",
});

const [err,setErr]=React.useState(null);


const handleChange=(e)=>{
  setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
};

const handleClick=async e=>{
  e.preventDefault()
// on clicking the register button it will send posts request on given url with data input, then data is upload on database  
  try{
    await axios.post("http://localhost:8800/api/auth/register",input);

  }catch(err){
    setErr(err.response.data);
  }
};

console.log(err);

  return (
    <div className="register">
      <div className="card">
      <div className="left">
        <h1>Social Media</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <span>Do you have an account?</span>
        <Link to="/login">
        <button>Login</button>
        </Link>
        </div>
        <div className="right">
        <h1>Register</h1>
        <form>
          <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
          <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
          <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
          <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
          {err&&err}
          <button onClick={handleClick}>Register</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Register;

