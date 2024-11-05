import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import useStore from '../../store/store';
import { toast, ToastContainer } from 'react-toastify';
import { Pencil, Trash, Plus, Check, X } from 'lucide-react';

const Modal = ({ showModal, handleClose, editData }) => {
  const { addService, updateService, cat, getServices } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    minPrice: '',
    maxPrice: '',
    categoryId: '',
    description: '',
    tags: '',
  });

  const fetchServices = async () => {
    try {
      await getServices();
    } catch (err) {
      toast.error('Error fetching services');
    }
  };

  // Reset form when modal closes or switches between edit/create
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        imageUrl: editData.imageUrl || '',
        minPrice: editData.minPrice || '',
        maxPrice: editData.maxPrice || '',
        categoryId: editData.category || '',
        description: editData.description || '',
        tags: editData.tags ? editData.tags.join(', ') : '',
      });
    } else {
      setFormData({
        name: '',
        imageUrl: '',
        minPrice: '',
        maxPrice: '',
        categoryId: '',
        description: '',
        tags: '',
      });
    }
  }, [editData, showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const tagsArray = formData.tags.split(',').map((tag) => tag.trim());
    try {
      if (editData) {
        await updateService(
          editData._id,
          formData.name,
          formData.minPrice,
          formData.maxPrice,
          formData.imageUrl,
          formData.description,
          tagsArray // Pass tags array for editing
        );
        toast.success('Service updated successfully');
      } else {
        await addService(
          formData.name,
          formData.categoryId,
          Number(formData.minPrice),
          Number(formData.maxPrice),
          formData.imageUrl,
          formData.description,
          tagsArray // Pass tags array for adding a new service
        );
        toast.success('Service added successfully');
      }
      handleClose();
      fetchServices();
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`fixed z-10 shadow-2xl top-20 px-4 bg-white py-2 left-1/2 -translate-x-1/2 border-2 border-black min-w-[300px] ${showModal ? 'block' : 'hidden'}`}>
      <h1 className='text-2xl font-semibold'>{editData ? 'Edit Service' : 'Service Details'}</h1>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className='w-full p-2 my-2 bg-gray-200 rounded-md'
        placeholder='Name'
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        className='w-full p-2 my-2 bg-gray-200 rounded-md'
        placeholder='Image URL'
        required
      />
      <div className='flex justify-between gap-4'>
        <div>
          From: <input
            className='p-2 my-2 bg-gray-200 rounded-md max-w-[10ch]'
            type="number"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          To: <input
            className='p-2 my-2 bg-gray-200 rounded-md max-w-[10ch]'
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className='flex my-2 bg-gray-200 rounded-md'>
        <select
          className='p-2 bg-gray-200 rounded-md grow'
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {cat.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
        </select>
      </div>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className='w-full p-2 my-2 bg-gray-200 rounded-md'
        placeholder='Description'
        required
      />
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        className='w-full p-2 my-2 bg-gray-200 rounded-md'
        placeholder='Tags (comma-separated)'
      />
      <div className='flex justify-between'>
        <button
          type="submit"
          disabled={loading}
          className='flex items-center gap-2 p-2 text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300'
        >
          <Check />{loading ? 'Processing...' : (editData ? 'Update' : 'Submit')}
        </button>
        <button
          type='button'
          className='flex items-center gap-2 p-2 text-white bg-black hover:bg-gray-800'
          onClick={handleClose}
        >
          <X />Close
        </button>
      </div>
    </form>
  );
};


const FAQModal = ({ showFAQModal, handleClose, serviceId, faqs }) => {
  const { addFAQ, updateFAQ, deleteFAQ } = useStore();
  const [loading, setLoading] = useState(false);
  const [faqData, setFaqData] = useState({
    question: '',
    answer: ''
  });
  const [editingFaq, setEditingFaq] = useState(null);
  const [currentFaqs, setCurrentFaqs] = useState([]);

  // Initialize and update currentFaqs when faqs prop changes
  useEffect(() => {
    if (faqs && Array.isArray(faqs)) {
      setCurrentFaqs(faqs);
    } else {
      setCurrentFaqs([]);
    }
  }, [faqs]);

  useEffect(()=>{
    console.log("Current FAQs: ",currentFaqs)
  },[currentFaqs])

  const handleFAQChange = (e) => {
    const { name, value } = e.target;
    setFaqData(prev => ({
      ...prev,
      [name]: value || '' // Ensure value is never undefined
    }));
  };

  const resetForm = () => {
    setFaqData({
      question: '',
      answer: ''
    });
    setEditingFaq(null);
  };
  // const handleFAQSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   try {
  //     if (editingFaq) {
  //       const updatedFaq = await updateFAQ(serviceId, editingFaq._id, faqData.question, faqData.answer);
  //       if (updatedFaq) {
  //         setCurrentFaqs(prev => 
  //           prev.map(faq => faq._id === editingFaq._id ? updatedFaq : faq)
  //         );
  //         toast.success("FAQ updated successfully");
  //       }
  //     } else {
  //       const updatedFaqs = await addFAQ(serviceId, faqData.question, faqData.answer);
  //       if (Array.isArray(updatedFaqs)) {
  //         setCurrentFaqs(updatedFaqs); // Replace entire faqs array with new one
  //         toast.success("FAQ added successfully");
  //       }
  //     }
  //     resetForm();
  //   } catch (error) {
  //     console.error('FAQ submission error:', error);
  //     toast.error(error.message || "Failed to submit FAQ");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleFAQSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    if (editingFaq) {
      const updatedFaqs = await updateFAQ(
        serviceId, 
        editingFaq._id, 
        faqData.question, 
        faqData.answer
      );
      if (Array.isArray(updatedFaqs)) {
        setCurrentFaqs(updatedFaqs); // Replace entire faqs array
        toast.success("FAQ updated successfully");
      }
    } else {
      const updatedFaqs = await addFAQ(serviceId, faqData.question, faqData.answer);
      if (Array.isArray(updatedFaqs)) {
        setCurrentFaqs(updatedFaqs);
        toast.success("FAQ added successfully");
      }
    }
    resetForm();
  } catch (error) {
    console.error('FAQ submission error:', error);
    toast.error(error.message || "Failed to submit FAQ");
  } finally {
    setLoading(false);
  }
};
  const handleEditFAQ = (faq) => {
    setEditingFaq(faq);
    setFaqData({
      question: faq.question || '',
      answer: faq.answer || ''
    });
  };

  const handleDeleteFAQ = async (faqId) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await deleteFAQ(serviceId, faqId);
        setCurrentFaqs(prev => prev.filter(faq => faq._id !== faqId));
        toast.success("FAQ deleted successfully");
      } catch (error) {
        toast.error("Failed to delete FAQ");
      }
    }
  };

  return (
    <div className={`fixed z-10 shadow-2xl top-20 px-4 bg-white py-2 left-1/2 -translate-x-1/2 border-2 border-black min-w-[300px] ${showFAQModal ? 'block' : 'hidden'}`}>
      <h2 className='mb-4 text-2xl font-semibold'>{editingFaq ? "Edit FAQ" : "Add FAQ"}</h2>
      
      <form onSubmit={handleFAQSubmit}>
        <input
          type="text"
          name="question"
          value={faqData.question}
          onChange={handleFAQChange}
          className='w-full p-2 my-2 bg-gray-200 rounded-md'
          placeholder='Question'
          required
        />
        <textarea
          name="answer"
          value={faqData.answer}
          onChange={handleFAQChange}
          className='w-full p-2 my-2 bg-gray-200 rounded-md min-h-[100px]'
          placeholder='Answer'
          required
        />
        <div className='flex justify-between'>
          <button
            type="submit"
            disabled={loading}
            className='flex items-center gap-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:bg-blue-300'
          >
            <Check />{loading ? 'Processing...' : (editingFaq ? 'Update FAQ' : 'Add FAQ')}
          </button>
          <button
            type='button'
            className='flex items-center gap-2 p-2 text-white bg-black rounded-md hover:bg-gray-800'
            onClick={() => {
              resetForm();
              handleClose();
            }}
          >
            <X />Close
          </button>
        </div>
      </form>

      <div className='mt-6'>
        <h3 className='mb-3 text-xl font-semibold'>Existing FAQs</h3>
        {(!currentFaqs || currentFaqs.length === 0) && (
          <p className='italic text-gray-500'>No FAQs added yet</p>
        )}
        {currentFaqs && currentFaqs.map((faq) => (
          <div key={faq?._id || Math.random()} className='p-4 mb-3 rounded-lg shadow-sm bg-gray-50'>
            <h4 className='font-semibold'>{faq?.question}</h4>
            <p className='mt-1 mb-3 text-gray-600'>{faq?.answer}</p>
            <div className='flex gap-2'>
              <button
                type="button"
                onClick={() => handleEditFAQ(faq)}
                className='flex items-center gap-1 p-2 text-white bg-black rounded-full hover:bg-gray-800'
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteFAQ(faq._id)}
                className='flex items-center gap-1 p-2 text-white bg-red-600 rounded-full hover:bg-red-700'
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryToggles = () => {
  const {getAllCat, cat, getServices} = useStore();
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
  // Load all categories
  useEffect(() =>{
   async function fetchAllCategories(){
    try{
      await getAllCat();
    }catch(err){
      toast.error('Error fetching categories');
      setError(true);
    }finally{
      setLoading(false);
    }
   }
   fetchAllCategories();
  },[]);
  // Handle Category Select
  const handleCategoryToggle = (id) =>{
    async function loadServices(){
      try {
        await getServices(id);
        toast.success("Fetched services");
      } catch (error) {
        toast.error("Error fetching Services")
      }
    }
    loadServices();
  }
  if(loading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error</div>
  }
  const handleClose = ()=>{
    setShowModal(false);
  }
  return(
    <div className='flex flex-wrap gap-4 mt-4'>
      <Modal showModal={showModal} handleClose={handleClose}/>
      <button onClick={()=>setShowModal(true)} className="flex justify-between gap-2 px-4 py-2 overflow-hidden text-white rounded-lg shadow-lg shadow-gray-400 bg-gradient-to-t from-black to-rose-900 hover:to-rose-700 hover:from-neutral-800"><Plus/>New Service</button>
       <button onClick={()=>handleCategoryToggle()}  className="relative px-4 py-2 overflow-hidden text-white rounded-lg shadow-lg shadow-gray-400 bg-gradient-to-t from-black to-cyan-900 hover:to-cyan-700 hover:from-neutral-800">
      <span className="relative">All</span></button>
      {cat.map(c=>{
        return(
          <button style={{background:`url(${c.imageUrl})`, backgroundSize:"cover",backgroundPosition:"center", backgroundRepeat:"no-repeat"}} className="relative px-4 py-2 overflow-hidden text-white transition-all rounded-lg shadow-lg shadow-gray-400 group" key={c._id} onClick={()=>handleCategoryToggle(c._id)}>
            <div className="absolute inset-0 group-hover:opacity-65 bg-gradient-to-t from-black to-transparent"></div><span className="relative font-bold">{c.name}</span></button>
        )
      })}

    </div>
  )
}

const AdminServices = () => {
  const { getServices, services, deleteService } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showFAQModal, setShowFAQModal] = useState(false);
const [currentServiceId, setCurrentServiceId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      await getServices();
    } catch (err) {
      setError('Failed to load services.');
      toast.error('Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        toast.success('Service deleted successfully');
        fetchServices();
      } catch (error) {
        toast.error('Error deleting service');
      }
    }
  };


  const handleClose = () => {
    setShowModal(false);
    setEditingService(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className="text-4xl">Services</h1>
        <CategoryToggles />
        <Modal 
          showModal={showModal} 
          handleClose={handleClose}
          editData={editingService}
        />
        <FAQModal 
  showFAQModal={showFAQModal}
  handleClose={() => setShowFAQModal(false)}
  serviceId={currentServiceId}
  faqs={services.find(s => s._id === currentServiceId)?.faqs || []}
/>
        <div className='flex flex-wrap gap-4 my-8'>
          {!services.length && (<div className='text-xl'>No Services Found</div>)}
          {services.map((service) => (
            <div key={service._id} className='overflow-hidden max-w-[250px] border-[1px] shadow-md border-gray-200 rounded-lg'>
              <div>
                <img src={service.imageUrl} className='w-auto h-[150px]' alt={service.name} />
              </div>
              <div className='px-4 py-2'>
                <h2 className='font-semibold'>{service.name}</h2>
                <h2 className='mt-2 font-bold'>${service.minPrice} - ${service.maxPrice}</h2>
                <p className='mt-4 mb-2 text-sm font-medium text-gray-500'>{service.description}</p>
                <div className='flex gap-2 mt-4'>
                  <button 
                    onClick={() => handleEdit(service)}
                    className='flex gap-2 p-3 text-white transition-transform bg-black rounded-full hover:-translate-y-1 hover:bg-neutral-700'
                  >
                    <Pencil size={18}/>
                  </button>
                  <button 
    onClick={() => {
      setCurrentServiceId(service._id);
      setShowFAQModal(true);
    }}
    className='flex gap-2 p-3 text-white transition-transform bg-blue-600 rounded-full hover:-translate-y-1 hover:bg-blue-700'
  >
    <Plus size={18}/>
  </button>
                  <button 
                    onClick={() => handleDelete(service._id)}
                    className='flex gap-2 p-3 text-white uppercase transition-transform bg-red-600 rounded-full shadow-sm hover:-translate-y-1 hover:bg-red-700'
                  >
                    <Trash size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </main>
      <ToastContainer position='top-center' autoClose={500} hideProgressBar={true} theme='dark' />
    </div>
  );
};


export default AdminServices;



