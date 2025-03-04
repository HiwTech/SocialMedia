import React,{useState}  from 'react'
import './login.css'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react'
import { useNavigate } from "react-router";



function Login() {
  const [inputs, setInputs] = useState({
      username: "",
        password: "",
    });
    const [err, setErr] = useState(null);
     const navigate = useNavigate()
  
  
    const handleChange = (e)=>{
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
      
  
    }

  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")
      
    }catch (error) {
      setErr(error.response?.data);
      //console.log(response.data)
    }
  };
     ;

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World!</h1>
          <p>
            Connect with your friends and family . See what is going on around
            the world. Share your thought, ideas, and more
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            {err && <div style={{ color: "red" }}>{err}</div>} 
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login