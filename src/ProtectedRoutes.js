import { Navigate } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function ProtectedRoute({children}) {
  
  const isAuth = cookies.get("userId") === undefined ? false : true

  return (
      isAuth ? children : <Navigate to='/login'/>
  )
}

export default ProtectedRoute;
