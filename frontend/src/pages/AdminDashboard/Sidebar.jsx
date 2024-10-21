import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, FileCheck, Clock4, History, UserPen, LogOut, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    // { name: 'Dashboard', icon: BarChart, path: '/admin' },
    { name: 'Tasks', icon: FileCheck, path: '/admin/tasks' },
    { name: 'Track Tasks', icon: Clock4, path: '/admin/track' },
    { name: 'Payments', icon: History, path: '/admin/payments' },
    // { name: 'Account', icon: UserPen, path: '/admin/account' },
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
            <button className="flex items-center text-gray-600 hover:text-gray-800">
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