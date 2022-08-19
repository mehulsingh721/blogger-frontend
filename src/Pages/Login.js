import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
function Login() {
  let navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleCookie = (token, id) => {
    cookies.set("auth_token", token, {path: "/"})
    cookies.set("userId", id, {path: "/"})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
      email: username,
      password: password
    }
    //make axios post request
    await axios.post("http://localhost:8000/api/login", data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if(res.status === 200){
        handleCookie(res.data.accessToken, res.data.userId)
        navigate('/')
      }
    })    
  }

  return (
    <div>
      <div className="login">
        <form className="login__form">
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username or Email"/>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleSubmit} className="login__form--submit">Login</button>
        </form>

        <div className="seprator">
          <div className="line"></div>
          <p>Or</p>
          <div className="line"></div>
        </div>

        <Link to="/register" className="btn-register">Register</Link>
      </div>
    </div>
  )
}

export default Login;
