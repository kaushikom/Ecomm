import React from 'react';
import Sidebar from './Sidebar';

const Users = () => {
  return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Dashboard</h1>
        </main>
      </div>
  )
}

export default Users