import axios from "axios"
import { useParams } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()
const SingleBlog = () => {
  const {id} = useParams()
  const [blog, setBlog] = useState({})

  useEffect(() => {
    getBlog()
  }, [])

  const getBlog = () => {
    axios.get("api/blogs/blog", {
      // headers: {
      //   Content-Type: "application/json"
      // },
      params: {
        blogId: id
      }
    }).then((res) => {
      setBlog(res.data)
    })
  }

  return(
    <div>
      <Navbar/>
      <div>
        <div className="single-blog">
          <h1 className="title">{blog.title}</h1>
          <div dangerouslySetInnerHTML={{__html: blog.body}}></div>
        </div>
      </div>
    </div>
  )

}

export default SingleBlog
