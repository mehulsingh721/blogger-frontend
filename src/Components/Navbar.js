import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    cookies.remove("auth_token")
    cookies.remove("userId")
    navigate("/login")
  }
  return(
    <header>
      <nav className="nav">
        <div className="nav__logo">Blogger</div>
        <ul className="nav__links">
          <li><NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">Home</NavLink></li>
          {
            cookies.get("userId") !== undefined ? 
            <>
            <li><NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to={`/my-blog/${cookies.get("userId")}`}>My Blog</NavLink></li>
              <li className="logout" onClick={logout}>Logout</li>
            </>
            :
            <li className="login-btn"><NavLink to="/login">Login To Create Your Own Blog</NavLink></li>
          }
        </ul>
      </nav>
    </header>
  )
}
export default Navbar
