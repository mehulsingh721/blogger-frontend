import Navbar from "../Components/Navbar"
import { useEffect, useState} from "react"
import axios from "axios";
import BlogEditor from "../Components/BlogEditor"
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie"

const cookies = new Cookies
const MyBlog = () => {
  const {userId} = useParams()
  const [userName, setUserName] = useState("")
  const [blogs, setBlogs] = useState([])
  const [editor, setEditor] = useState(false)
   
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = () => {
    const params = {
      userId: 20
    }
    axios.get("http://localhost:8000/api/blogs/user", {
      params: params
    }).then((res) => {
      setUserName(res.data.username)
      setBlogs(res.data.blogs)
    })
  }

  const createBlog = (title, excerpt, content) => {
    const data = {
      title: title,
      excerpt: excerpt,
      body: content
    }
    axios.post("http://localhost:8000/api/blogs/create", data, {
      headers: {
        Authorization: `Bearer ${cookies.get("auth_token")}`
      },
      params: {
        userId: cookies.get("userId")
      }
    }).then((res) => {
      if(res.status === 201){
        getUserData()
        toggleBlogEditor()
      }
    })
  }

  const toggleBlogEditor = () => {
    setEditor(!editor);
  }

  return(
    <div>
      { editor ? 
      <BlogEditor toggleEditor={toggleBlogEditor} handleCallback={createBlog}/>
        : null
      }
      <Navbar/>
      <button className="add-blog" onClick={toggleBlogEditor}>+</button>
      <div className="blog">
        <h1 className="heading-1"><span>{userName}'s Blogs!!</span></h1>
        <div className="blog__items">
        </div>
      </div>
    </div>
  )
}
export default MyBlog
