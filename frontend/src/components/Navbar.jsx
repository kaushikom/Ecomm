import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import useStore from '../store/store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const itemCount = cart.length;

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'IT', href: 'it' },
    { name: 'AI', href: 'ai' },
    { name: 'AUTOMATION', href: 'automation' },
    { name: 'DIGITAL MARKETING', href: 'marketing' },
    { name: 'ALL PRODUCTS', href: '/services' },
    { name: 'BLOGS', href: '/blogs' },
  ];

  const categories = [
    'CLOTHING', 'BAGS', 'FOOTWEAR', 'WATCHES', 'ACCESSORIES',
    'HOUSE OF DESIGN', 'BEAUTY & PERSONAL CARE', 'HOME & DECOR', 'KITCHEN',
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 mr-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center flex-shrink-0">
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">CODE BACWARD LAB</span>
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({isActive})=> isActive ? "bg-slate-800 min-w-[60px] text-center text-slate-300 px-2 py-2 text-sm font-medium rounded-md hover:text-gray-50": "px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900"}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-gray-400 sm:w-6 sm:h-6" />
            <Link to="/user">
              <User className="w-5 h-5 text-gray-400 sm:w-6 sm:h-6" />
            </Link>
            <Link className="relative inline-block" to={"/cart"}>
                <ShoppingCart className="w-5 h-5 text-gray-400 sm:w-6 sm:h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full min-w-[1.25rem] text-center">
                    {itemCount}
                  </span>
                )}
            </Link>
          </div>
        </div>
      </div>

      { isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="block px-3 py-2 text-sm font-medium text-center text-gray-600 rounded-md hover:text-gray-900"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;