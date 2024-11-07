import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../../store/store';
import { LayoutGrid, FileCheck, Star, Clock4, History, LogOut, Menu, X, Layers } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {logout} = useStore()
  const location = useLocation();
const handleLogout = () => {
    logout();
  }
  const menuItems = [
    { name: 'All Orders', icon: FileCheck, path: '/admin/tasks' },
    { name: 'Payments', icon: History, path: '/admin/payments' },
    {name:'Categories', icon:LayoutGrid, path:'/admin/categories'},
    {name:'Services',icon: Layers, path:'/admin/services'},
    {name:'Reviews',icon:Star, path:'/admin/reviews'}
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed z-20 top-20 left-4 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed rounded-lg inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-screen">
          <nav className="flex-grow">
            <ul className="p-4 space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)} // Close sidebar on mobile after click
                  >
                    <item.icon className="mr-3" size={18} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4">
            <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-gray-800">
              <LogOut className="mr-3" size={18} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;