import { Facebook, Globe, Twitter, Instagram, Rss } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10 text-gray-600 bg-gray-100">
      <div className="container px-4 mx-auto">
        {/* Subscription Section */}
        <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
          <div className="mb-4 text-center md:text-left md:mb-0">
            <h4 className="text-lg font-semibold">KNOW IT ALL FIRST!</h4>
            <p className="text-sm">Never Miss Anything From Code Backward Lab By Signing Up To Our Newsletter.</p>
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <button className="px-6 py-2 ml-2 text-white bg-red-500 rounded-md">SUBSCRIBE</button>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col justify-between lg:flex-row">
          {/* Left Section */}
          <div className="mb-6 text-center lg:text-left lg:mb-0">
            <h4 className="mb-4 text-2xl font-bold">Code Backward Lab</h4>
            <p className="max-w-xs text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-center mt-4 space-x-4 lg:justify-start">
              <Facebook className="w-6 h-6 text-gray-500 hover:text-gray-900" />
              <Globe className="w-6 h-6 text-gray-500 hover:text-gray-900" />
              <Twitter className="w-6 h-6 text-gray-500 hover:text-gray-900" />
              <Instagram className="w-6 h-6 text-gray-500 hover:text-gray-900" />
              <Rss className="w-6 h-6 text-gray-500 hover:text-gray-900" />
            </div>
          </div>

          {/* My Account Section */}
          <div className="text-center lg:text-left">
            <h4 className="mb-4 text-lg font-semibold">MY ACCOUNT</h4>
            <ul className="space-y-2">
              <li>Dashboard</li>
              <li>Orders</li>
              <li>Purchases</li>
              {/* <li>SIGN</li> */}
            </ul>
          </div>

          {/* Why We Choose Section */}
          <div className="text-center lg:text-left">
            <h4 className="mb-4 text-lg font-semibold">WHY WE CHOOSE</h4>
            <ul className="space-y-2">
              <li>Shipping & Return</li>
              <li>Secure Shopping</li>
              <li>Gallery</li>
              <li>Affiliates</li>
              <li>Contacts</li>
            </ul>
          </div>

          {/* Store Information */}
          <div className="text-center lg:text-left">
            <h4 className="mb-4 text-lg font-semibold">STORE INFORMATION</h4>
            <ul className="space-y-2">
              <li>Code Backward Lab Demo Store, Demo Store India 345-659</li>
              <li>Call Us: 123-456-7898</li>
              <li>Email Us: Support@Fiot.com</li>
              <li>Fax: 123456</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 text-sm text-center text-gray-500">
          © 2024 Code Backward Lab
        </div>
      </div>
    </footer>
  );
};

export default Footer;
