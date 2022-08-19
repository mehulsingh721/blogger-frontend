import Navbar from "../Components/Navbar"
import { useEffect, useState} from "react"
import axios from "axios";
import BlogEditor from "../Components/BlogEditor"
import { useParams, NavLink } from "react-router-dom";
import BlogEditEditor from "../Components/BlogEditEditor";
import Cookies from "universal-cookie"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const cookies = new Cookies()
const MyBlog = () => {
  const {id} = useParams()
  const [userName, setUserName] = useState("")
  const [blogs, setBlogs] = useState([])
  const [editor, setEditor] = useState(false)
  const [editEditor, setEditEditor] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState()
   
  useEffect(() => {
    getUserData()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserData = () => {
    const params = {
      userId: id
    }
    axios.get("api/blogs/user", {
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
    axios.post("api/blogs/create", data, {
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

  const updateBlog = (title, excerpt, content, blogId) => {
    const data = {
      title: title,
      excerpt: excerpt,
      body: content
    }
    axios.put("api/blogs/update", data, {
      headers: {
        Authorization: `Bearer ${cookies.get("auth_token")}`,
      },
      params: {
        blogId: blogId,
      }
    }).then((res) => {
      if(res.status === 200){
        getUserData()
        toggleBlogEditEditor()
      }
    })
  }

  const deleteBlog = (id) => {
    axios.delete("api/blogs/delete", {
      headers: {
        Authorization: `Bearer ${cookies.get("auth_token")}`,
      },
      params: {
        blogId: id,
      }
    }).then((res) => {
      if(res.status === 200){
        getUserData()
      }
    })
  }

  const toggleBlogEditor = () => {
    setEditor(!editor);
  }

  const toggleBlogEditEditor = (blog) => {
    setEditEditor(!editEditor)
    setSelectedBlog(blog)
  }

  return(
    <div>
      { editEditor ? 
      <BlogEditEditor toggleEditor={toggleBlogEditEditor} handleCallback={updateBlog} blog={selectedBlog}/>
        : null
      }
      { editor ? 
      <BlogEditor toggleEditor={toggleBlogEditor} handleCallback={createBlog}/>
        : null
      }
      <Navbar/>
      <button className="add-blog" onClick={toggleBlogEditor}>+</button>
      <div className="blog">
        <h1 className="heading-1"><span>{userName}'s Blogs!!</span></h1>
        <div className="blog__items">
          {blogs.map((blog, index) => 
           <div key={blog.id}>
            <div className="blog__items--item">
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <div>
                <NavLink to={`/single-blog/${blog.id}`}>Read More...</NavLink>
                <div className="actions">
                  <div onClick={() => toggleBlogEditEditor(blog)}>
                    <FontAwesomeIcon icon="fa-pen" />
                  </div>
                  <div onClick={() => deleteBlog(blog.id)}>
                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                  </div>
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
export default MyBlog
