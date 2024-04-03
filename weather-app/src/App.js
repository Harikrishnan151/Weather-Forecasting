
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useContext, useState } from 'react'
import Home from './Pages/HomePage/Home';
import UserLogin from './Pages/user/UserLogin';
import UserRegister from './Pages/user/UserRegister';
import AdminLogin from './Pages/admin/AdminLogin';
import Emergency from './Pages/emergency/Emergency';
import Landingpage from './Pages/UserLandingpage/Landingpage';
import DashboardUser from './Pages/userDashboard/DashboardUser';
import AddPosts from './Pages/addPost/AddPosts';
import EditPost from './Pages/editPost/EditPost';
import AllPost from './Pages/allpost/AllPost';
import WeatherForecast from './Pages/weatherForecast/WeatherForecast';
import Forecasting from './Pages/forecasting/Forecasting';
// import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import Admin from './Pages/AdminDashboard/Admin'
import UserEmergecy from './Pages/userEmergency/UserEmergecy';
import ResetPassword from './Pages/resetpassword/ResetPassword';
import EmergencySingleView from './Pages/AdminEmergency/EmergencySingleView';
import EditUser from './Pages/EditUserDetails/EditUser';
import UserPost from './Pages/UserPost/UserPost';
// import { AuthContextStatus } from './Pages/AuthContext';



function App() {
// const token = localStorage.getItem('token')
  // const {authorizsed} = useContext(AuthContextStatus)

  return (
    <div className="App">
     
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/userRegister' element={<UserRegister/>}/>
        {/* <Route path='/AdminDashboard' element={<AdminDashboard/>}/> */}
        <Route path='/adminDashboard' element={<Admin/>}></Route>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
         <Route path='/emergency' element={<Emergency/>}/>
        <Route path='/home' element={<Landingpage/>}/>
        <Route path='/userEmergency' element={<UserEmergecy/>}/>
        <Route path='/userDashboard' element={<DashboardUser/>}/>
        <Route path='/addPost' element={<AddPosts/>}/>
        <Route path='/editPost/:id' element={<EditPost/>}/>
        <Route path='/allPost' element={<AllPost/>}/>
        <Route path='/weatherForecast' element={<WeatherForecast/>}/>
        <Route path='/Forecaste' element={<Forecasting/>}/>
        <Route path='/Reset-Password' element={<ResetPassword/>}/>
        <Route path='/EmergencySingleView/:id' element={<EmergencySingleView/>}></Route>
        <Route path='/Edit-user/:id' element={<EditUser/>}></Route>
        <Route path='/userPost/:id' element={<UserPost/>}></Route>


      </Routes>
      
     
    </div>
  );
}

export default App;
