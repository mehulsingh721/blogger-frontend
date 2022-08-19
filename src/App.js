import Navbar from './Components/Navbar';
import Home from "./Pages/Home"
import Login from './Pages/Login';
import MyBlog from './Pages/MyBlog';
import Register from './Pages/Register';
import './App.css';
import { Routes, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Routes>
            <Route exact path='/' element={<Home/>}/>
          <Route exact path='/my-blog/:id' element={<MyBlog/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
        </Routes>
      </div>
  );
}

export default App;
