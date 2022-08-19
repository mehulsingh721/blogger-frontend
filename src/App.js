import Navbar from './Components/Navbar';
import Home from "./Pages/Home"
import Login from './Pages/Login';
import MyBlog from './Pages/MyBlog';
import Register from './Pages/Register';
import SingleBlog from './Pages/SingleBlog';
import ProtectedRoute from "./ProtectedRoutes"
import './App.css';
import { Routes, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
            <Route exact path='/my-blog/:id' element={<ProtectedRoute><MyBlog/></ProtectedRoute>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/single-blog/:id' element={<SingleBlog/>}/>
        </Routes>
      </div>
  );
}

export default App;
