import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
function Register() {
  let navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleCookie = (token, id) => {
    cookies.set("auth_token", token, {path: "/"})
    cookies.set("userId", id, {path: "/"})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
      name: fullName,
      email: username,
      password: password,
    }

    const headers = {
      'Accept': 'application/json',
    }
    try {
      await axios.post('http://localhost:8000/api/register', data, headers).then((res) => {
        console.log(res)
        if(res.status===200){
          handleCookie(res.data.accessToken, res.data.userId);
          navigate('/')
        }
      })
    }

    catch(err){
      console.log(err)
    }
  }

  return(
    <div>
      <div className="registration">
        <form className="registration__form">
          <input type="text" onChange={(e) => setFullName(e.target.value)} placeholder="Fullname" />
          <input type="email" onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button onClick={handleSubmit} className="btn-register">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register;
