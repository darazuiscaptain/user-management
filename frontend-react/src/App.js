import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import PrivateRoutes from './protected/PrivateRoutes';
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './pages/footer/Footer';
import Adduser from './pages/addUser/Adduser';
import Edituser from './pages/edditUser/Edituser';
import Viewuser from './pages/viewUser/Viewuser';

export const Student_BASE_URL = "https://localhost:7140/api/Student";
export const User_BASE_URL = "https://localhost:7140/api/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' Component={Login} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />

        {/*Private Route */}
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/new-user' Component={Adduser} />
          <Route path='/dashboard/edit-user/:id' Component={Edituser} />
          <Route path='/dashboard/view-user/:id' Component={Viewuser}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
