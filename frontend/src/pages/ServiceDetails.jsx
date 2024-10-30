import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../store/store'; // Import Zustand store
import ServiceFeatures from '../components/ServiceFeature';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';
import { toast, ToastContainer } from 'react-toastify';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How I can share my files with you?",
      answer: "You can share your files through our secure file upload system on the project dashboard. Alternatively, you can use cloud storage services like Google Drive or Dropbox and share the link with us."
    },
    {
      question: "Can you provide music for my video?",
      answer: "Yes, we can provide royalty-free music for your video. We have a vast library of tracks to choose from, or we can create custom music tailored to your project's needs."
    },
    {
      question: "Can you do motion graphics ?",
      answer: "Absolutely! We offer professional motion graphics services. Our team can create animated logos, title sequences, infographics, and other visual elements to enhance your video content."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">FAQ</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="flex items-center justify-between w-full p-4 text-left transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => toggleQuestion(index)}
          >
            <span className="font-medium text-gray-800">{faq.question}</span>
            <ChevronDown
              className={`transform transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="p-4 mt-2 bg-white rounded-md shadow-inner">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ServiceDetails = () => {
  const {serviceId} = useParams();
  const {services, user, addTask} = useStore();
  const thisService = services.find(service=>service._id == serviceId);
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');

    const handleBookClick = () => {
    if (!user) {
      // Store the current URL in localStorage before redirecting
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/login');
      return;
    }
    setShowBookingForm(true);
  };

    const handleSubmitBooking = async() => {
   
      try {
        await addTask(serviceId, user._id, bookingMessage);
        toast.success("Submitted")
      } catch (error) {
        toast.error(error.message);
      }finally{
        setBookingMessage('');
        setShowBookingForm(false);
      }
  
  };


  if (!thisService) {
    return <div>Service not found</div>;
  }

  return (
    <>
      <div className="flex justify-between p-10 bg-gray-50">
        {/* Left Section: Image */}
        <div className="w-1/2">
          <img
            src={thisService.imageUrl}
            alt={thisService.name}
            className="object-cover w-full rounded-lg shadow-md h-96"
          />
          <div className="flex gap-4 mt-8">
            <span className="px-3 py-2 text-center bg-gray-200 border-2 border-gray-400 rounded-full ">
              Web Development
            </span>
            <span className="px-3 py-2 text-center bg-gray-200 border-2 border-gray-400 rounded-full">
              JavaScript
            </span>
            <span className="px-3 py-2 text-center bg-gray-200 border-2 border-gray-400 rounded-full">
              Ecommerce Development
            </span>
            <span className="px-3 py-2 text-center bg-gray-200 border-2 border-gray-400 rounded-full">
              Web3 Development
            </span>
          </div>
          <div className="mt-8">
            <ServiceFeatures />
          </div>
          <FAQAccordion />
        </div>

        {/* Right Section: Details */}
        <div className="w-1/2 pl-10">
          <h1 className="mb-4 text-4xl font-bold">{thisService.name}</h1>


          <div>Price : ${thisService.minPrice} - ${thisService.maxPrice}</div>

          {/* Offers Section */}
          <div className="mt-4 space-y-4 text-gray-700">
            <h3 className="font-bold">Product Description</h3>
            <p>
              {thisService.description}
            </p>
           {!showBookingForm && (<button onClick={handleBookClick} className='px-20 py-2 font-semibold uppercase border-2 border-black hover:bg-black hover:text-white'>Book</button>)} 
            
            {/* Booking Form */}
            {showBookingForm && (
              <div className="mt-4 space-y-4">
                <textarea
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                  placeholder="Please describe your requirements..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  rows={4}
                />
                <button
                  onClick={handleSubmitBooking}
                  className="px-8 py-2 text-white bg-black rounded-md hover:bg-gray-800"
                >
                  Submit Booking
                </button>
                <button
                  onClick={()=>setShowBookingForm(false)}
                  className="px-8 py-2 ml-4 text-black border-2 border-black rounded-md hover:bg-gray-200"
                >
                 Cancel
                </button>
              </div>
            )}
          </div>
          <ReviewSection />
        </div>
          <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      theme='dark'
      />
      </div>
    </>
  );
};

export default ServiceDetails;

