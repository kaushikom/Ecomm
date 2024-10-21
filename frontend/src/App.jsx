import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import SignUpComponent from './pages/SignUp';
import BlogPage from './pages/Blogs';
import BlogDetailPage from './pages/BlogDetailPage';
import IT from './pages/IT';
import AI from './pages/AI';
import Automation from './pages/Automation';
import Marketing from './pages/Marketing';
import Footer from './components/Footer';
import User from './pages/UserDashboard/User'
import Admin from './pages/AdminDashboard/Admin';
import Tasks from './pages/UserDashboard/Tasks';
import AdminTasks from './pages/AdminDashboard/AdminTasks'
import TrackTasks from './pages/UserDashboard/TrackTasks';
import AdminTrack from './pages/AdminDashboard/AdminTrack'
import Payments from './pages/UserDashboard/Payments';
import AdminPayments from './pages/AdminDashboard/AdminPayments'
import Account from './pages/UserDashboard/Account';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import ToastContainer from 'rsuite/esm/toaster/ToastContainer';
import useStore from './store/store';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const {user} = useStore();
  useEffect(()=>console.log(user))
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dm-sans">
        <ToastContainer/>
        <Navbar />
        <main className="container px-4 py-8 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:categoryId/:taskId" element={<ServiceDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
            <Route path="/it" element={<IT />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/marketing" element={<Marketing />} />        
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute/>}>
             <Route path="/cart" element={<Cart />} />
                 <Route path="/user" element={<Account />} />
                   <Route path="/admin" element={<Admin />} />
                      <Route path="/user/tasks" element={<Tasks />} />
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/user/track" element={<TrackTasks />} />
            <Route path="/admin/track" element={<AdminTrack />} />
            <Route path="/user/payments" element={<Payments />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
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