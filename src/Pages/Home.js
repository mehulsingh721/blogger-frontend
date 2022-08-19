import Navbar from "../Components/Navbar"
const Home = () => {
  return(
    <div>
      <Navbar/>
      <div className="blog">
        <h1 className="heading-1"><span>All Blogs!!</span></h1>
        <div className="blog__items">
        </div>
      </div>
    </div>
  )
}
export default Home
