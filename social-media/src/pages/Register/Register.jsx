import React , {useState} from "react";
import "./register.css";
import { Link } from "react-router";
import axios from 'axios'

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);


  const handleChange = (e)=>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    

  }
  const handleRegistration = async(e)=>{
    e.preventDefault()
    try {

      await axios.post("http://localhost:8880/api/auth/register", inputs);
      
     
      
    } catch (err) {
      setErr(err.response.data);
      console.log(err)
      
    }
  }
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Hiwi Social!</h1>
          <p>
            See what your friends are upto. Share your thought, ideas, and more
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleRegistration}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
