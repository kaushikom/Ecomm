import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Search, Edit, Save, X, Trash2 } from 'lucide-react'

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    milestoneName: '',
    description: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.milestoneName && formData.description && formData.price) {
      if (editingId !== null) {
        // Update existing payment
        setPayments(prevPayments =>
          prevPayments.map(payment =>
            payment.id === editingId ? { ...payment, ...formData } : payment
          )
        );
        setEditingId(null);
      } else {
        // Add new payment
        setPayments(prevPayments => [...prevPayments, { ...formData, id: Date.now() }]);
      }
      setFormData({ milestoneName: '', description: '', price: '' });
      setToggleForm(false);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleEdit = (payment) => {
    setFormData(payment);
    setEditingId(payment.id);
    setToggleForm(true);
  };

  const handleCancelEdit = () => {
    setFormData({ milestoneName: '', description: '', price: '' });
    setEditingId(null);
    setToggleForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      setPayments(prevPayments => prevPayments.filter(payment => payment.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className='text-4xl'>Payments</h1>
        {/* Create payments */}
        <div className='border-[1px] flex justify-between max-w-[400px] bg-white shadow-md my-4 border-gray-300 px-4 py-2 rounded-lg text-xl'>
          <input className='bg-transparent focus:outline-none' type="text" placeholder='Enter task Id' />
          <button className=''><Search /></button>
        </div>
        {/* Container */}
        <div>
          {/* Task Card */}
          <div className='rounded-lg flex flex-col justify-between max-w-[400px] shadow-md bg-gradient-to-r from-blue-500 to-blue-700'>
            <h1 className='px-4 my-4 text-2xl font-semibold text-center text-white'>Web Development</h1>
            {/* Details subcard */}
            <div className='w-full p-4 bg-white rounded-lg'>
              <h3 className='my-4 text-xl font-semibold'>Id: <span className='text-gray-600'>2sdf32</span></h3>
              {payments.length === 0 ? (
                <h3>No Payments Found</h3>
              ) : (
                <div>
                  <h3 className='my-4 text-xl font-semibold'>Payments:</h3>
                  {payments.map(payment => (
                    <div key={payment.id} className='p-2 mb-4 border border-gray-300 rounded'>
                      <p><strong>Milestone:</strong> {payment.milestoneName}</p>
                      <p><strong>Description:</strong> {payment.description}</p>
                      <p><strong>Price:</strong> ${payment.price}</p>
                      <div className='flex gap-2 mt-2'>
                        <button 
                          onClick={() => handleEdit(payment)}
                          className='flex items-center px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600'
                        >
                          <Edit size={16} className="mr-1" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(payment.id)}
                          className='flex items-center px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600'
                        >
                          <Trash2 size={16} className="mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!toggleForm && (
                <button 
                  onClick={() => setToggleForm(true)} 
                  className='px-4 py-2 my-4 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                >
                  {editingId !== null ? 'Edit Payment' : 'Create Payment'}
                </button>
              )}
              {toggleForm && (
                <div className='flex flex-col gap-4 border-[1px] border-gray-300 rounded-lg my-4 py-2 px-2'>
                  <h1>{editingId !== null ? 'Edit payment' : 'Create new payment'}</h1>
                  <input 
                    type="text" 
                    name="milestoneName"
                    value={formData.milestoneName}
                    onChange={handleInputChange}
                    placeholder='Milestone name' 
                    className='p-2 border rounded'
                  />
                  <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder='Milestone description'
                    className='p-2 border rounded'
                  ></textarea>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder='Price' 
                    className='p-2 border rounded'
                  />
                  <div className='flex gap-2'>
                    <button 
                      onClick={handleSubmit} 
                      className='flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-800'
                    >
                      <Save size={16} className="mr-1" /> {editingId !== null ? 'Update' : 'Submit'}
                    </button>
                    <button 
                      onClick={handleCancelEdit} 
                      className='flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-800'
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Payments