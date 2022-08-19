import { NavLink } from "react-router-dom"
import { useParams } from "react-router-dom"
import Cookies from 'universal-cookie';
import { useEffect } from "react";
 
const cookies = new Cookies();
const Navbar = () => {
  return(
    <header>
      <nav className="nav">
        <div className="nav__logo">Blogger</div>
        <ul className="nav__links">
          <li><NavLink to="/">Home</NavLink></li>
          {
            cookies.get("userId") !== undefined ? 
            <>
              <li><NavLink to={`/my-blog/${cookies.get("userId")}`}>My Blog</NavLink></li>
              <li><NavLink to="/logout">Logout</NavLink></li>
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
