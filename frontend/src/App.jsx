import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useStore from './store/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import SignUpComponent from './pages/SignUp';
import BlogPage from './pages/Blogs';
import BlogDetailPage from './pages/BlogDetailPage';
import Category from './pages/Category';
import Footer from './components/Footer';
import Tasks from './pages/UserDashboard/Tasks';
import AdminTasks from './pages/AdminDashboard/AdminTasks'
import Categories from './pages/AdminDashboard/Categories';
import TrackTasks from './pages/UserDashboard/TrackTasks';
import AdminTrack from './pages/AdminDashboard/AdminTrack'
import Payments from './pages/UserDashboard/Payments';
import AdminPayments from './pages/AdminDashboard/AdminPayments'
import Account from './pages/UserDashboard/Account';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import ToastContainer from 'rsuite/esm/toaster/ToastContainer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminServices from './pages/AdminDashboard/AdminServices';
import { LoaderCircle, ServerCrash } from 'lucide-react';
import Success from './pages/Success';
import Failed from './pages/Failed';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminReviews from './pages/AdminDashboard/AdminReviews';

const App = () => {
 const {getAllCat, getServices, getAllReviews,checkAuth,isAuthenticated,user} = useStore();
 const [loading,setLoading] = useState(true);
 const [error,setError] = useState(false);
 useEffect(()=>{
  setCategories();
  setServices();
  checkAuth();
  setReviews();
 },[])

 console.log("Authentication: ", isAuthenticated);
 console.log(user);
 
 const setReviews = async() =>{
  setLoading(true);
  try {
    await getAllReviews();
  } catch (error) {
    console.log("Error while fetching reviews: ", error);
    setError(true);
  }finally{
    setLoading(false)
  }
 }

 const setCategories = async() =>{
  setLoading(true);
    try {
      await getAllCat()
    } catch (error) {
      console.log("Error whle fetching categories: ", error)
      setError(true);
    }finally{
      setLoading(false);
    }
  }
 const setServices = async() => {
  setLoading(true);
try {
  await getServices();
} catch (error) {
  console.log("Error while fetching services: ", error)
  setError(true)
}finally{
  setLoading(false);
}
  }


  if(loading) return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='animate-spin'><LoaderCircle size={80}/></div>
    </div>
  )
  if(error) return(
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100'>
      <ServerCrash size={50} />
      <h1 className='text-lg text-center'>An error occured! <br />Check the console for more details</h1>
    </div>
  )

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dm-sans">
        <ToastContainer/>
        <Navbar />
        <main className="container px-4 py-8 mx-auto">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/services/:serviceId" element={<ServiceDetails />} />
              {/* <Route path="/services" element={<Services />} /> */}
              <Route path="/signup" element={<SignUpComponent />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/success" element={<Success />} />
              <Route path="/failed" element={<Failed />} />
               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/reset-password/:token" element={<ResetPassword />} />
             
           {/* Admin protected Routes */}
            <Route element={<ProtectedRoute loginPage="/login" />}>
            <Route path='/admin' element={<AdminTasks/>}/>
             <Route path="/admin/tasks" element={<AdminTasks />} />
             <Route path="/admin/track" element={<AdminTrack />} />
             <Route path="/admin/payments" element={<AdminPayments />} />
             <Route path="/admin/categories" element={<Categories />} />
             <Route path="/admin/services" element={<AdminServices />} />
             <Route path="/admin/reviews" element={<AdminReviews />} />
            </Route>
          
            {/*User Protected Routes */}
            <Route element={<ProtectedRoute loginPage="/login"/>}>
             <Route path="/user" element={<Account />} />
             <Route path="/user/tasks" element={<Tasks />} />
             <Route path="/user/track" element={<TrackTasks />} />
             <Route path="/user/payments" element={<Payments />} />
             <Route path="/user/account" element={<Account />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;