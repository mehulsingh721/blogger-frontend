import Navbar from "../Components/Navbar"
import { useState,useEffect } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"

const Home = () => {
  const [blogs, setBlogs] = useState([])
   
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = () => {
    axios.get("api/blogs").then((res) => {
      console.log(res.data)
      setBlogs(res.data)
    })
  }

  return(
    <div>
      <Navbar/>
      <div className="blog">
        <h1 className="heading-1"><span>All Blogs!!</span></h1>
        <div className="blog__items">
          {blogs.map((blog, index) => 
           <div key={blog.id}>
            <div className="blog__items--item">
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <div>
                <NavLink to={`/single-blog/${blog.id}`}>Read More...</NavLink>
                <div className="actions">
                </div>
              </div>
            </div>
           </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
