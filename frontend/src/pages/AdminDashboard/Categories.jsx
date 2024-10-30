import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import useStore from '../../store/store';
import { Plus, Pencil, Trash, X, Check } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const Modal = ({ showModal, handleClose, editData }) => {
  const { addNewCat, updateCat } = useStore();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [navDisplay, setNavDisplay] = useState(false);
  const [desc, setDesc] = useState('');

  // Set form data when editing
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setUrl(editData.imageUrl);
      setNavDisplay(editData.navDisplay);
      setDesc(editData.description);
    }
  }, [editData]);

  // Reset form when modal closes
  useEffect(() => {
    if (!showModal) {
      setName('');
      setUrl('');
      setNavDisplay(false);
      setDesc('');
    }
  }, [showModal]);

  const handleNavDisplayChange = (e) => {
    // Convert the string value to boolean
    const value = e.target.value === 'true';
    setNavDisplay(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const promise = editData
      ? updateCat(editData._id, name, url, navDisplay, desc)
      : addNewCat(name, url, navDisplay, desc);

    toast.promise(promise, {
      pending: editData ? 'Updating' : 'Submitting',
      success: editData ? 'Updated' : 'Submitted',
      error: {
        render({data}) {
          return data.message;
        }
      }
    }).then(() => {
      handleClose();
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className={`fixed shadow-2xl top-20 px-4 bg-white py-2 left-1/2 -translate-x-1/2 border-2 border-black min-w-[200px] ${showModal ? 'block' : 'hidden'}`}>
      <h1 className='text-2xl font-semibold'>{editData ? 'Edit Category' : 'Category Details'}</h1>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='w-full p-2 my-2 bg-gray-200 rounded-md' placeholder='Name' />
      <input type="text" value={url} onChange={e=>setUrl(e.target.value)} className='w-full p-2 my-2 bg-gray-200 rounded-md' placeholder='Banner Image URL' />
      <div className='flex justify-between p-2 my-2 bg-gray-200 rounded-md'>
        <label htmlFor="navDisplay">Show in Navbar</label>
        <select 
          value={navDisplay.toString()} 
          onChange={handleNavDisplayChange} 
          className='bg-gray-200 rounded-md' 
          name="navDisplay" 
          id="navDisplay"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} name="description" className='w-full p-2 my-2 bg-gray-200 rounded-md' placeholder='Description'></textarea>
      <div className='flex justify-between'>
        <button className='flex p-2 text-white bg-blue-700 hover:bg-blue-800'>
          <Check/>{editData ? 'Update' : 'Submit'}
        </button>
        <button type='button' className='flex p-2 text-white bg-black hover:bg-gray-800' onClick={handleClose}>
          <X/>Close
        </button>
      </div>
      <ToastContainer position='top-center' autoClose={2000} hideProgressBar={false} theme='dark' />
    </form>
  );
};

const Categories = () => {
  const { getAllCat, cat, deleteCat } = useStore();
  const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleOpen = (category = null) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCat();
      setCategories(data);
    };
    fetchCategories();
  }, [cat]);

  const handleDeleteCat = async (id) => {
    toast.promise(
      deleteCat(id).then(data => {
        console.log(data);
      }),
      {
        pending: 'Deleting category...',
        success: 'Category deleted successfully!',
        error: {
          render({data}) {
            return data?.response?.data?.error || data.message || 'Failed to delete category';
          }
        }
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <Modal showModal={showModal} handleClose={handleClose} editData={editingCategory} />
      <main className="flex-grow p-8">
        <h1 className="text-4xl">Categories</h1>
        <button onClick={() => handleOpen()} className='flex gap-2 px-2 py-2 mt-4 text-white bg-blue-700 rounded-md hover:bg-blue-600'>
          <Plus/>Add New
        </button>

        {categories ? (
          <div className='flex flex-wrap gap-4 my-8'>
            {categories.map((category) => (
              <div key={category._id} className='overflow-hidden max-w-[250px] border-[1px] shadow-md border-gray-200 rounded-lg'>
                <div>
                  <img src={category.imageUrl} className='w-auto h-[150px]' alt={category.name} />
                </div>
                <div className='px-4 py-2'>
                  <h2 className='font-semibold'>{category.name}</h2>
                  <p className='mt-4 mb-2 text-sm font-medium text-gray-500'>{category.description}</p>
                 {category.navDisplay && (<span className='px-4 py-1 text-sm rounded-full bg-lime-500'>Navbar</span>)} 
                  <div className='flex gap-2 mt-4'>
                    <button 
                      onClick={() => handleOpen(category)} 
                      className='flex gap-2 p-3 text-white transition-transform bg-black rounded-full hover:-translate-y-1 hover:bg-neutral-700'
                    >
                      <Pencil size={18}/>
                    </button>
                    <button 
                      onClick={() => handleDeleteCat(category._id)} 
                      className='flex gap-2 p-3 text-white uppercase transition-transform bg-red-600 rounded-full shadow-sm hover:-translate-y-1 hover:bg-red-700'
                    >
                      <Trash size={18}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center sm:text-5xl'>Loading categories...</p>
        )}
      </main>
      <ToastContainer position='top-center' autoClose={2000} hideProgressBar={false} theme='dark' />
    </div>
  );
};

export default Categories;