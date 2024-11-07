import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../store/store';
import ServiceFeatures from '../components/ServiceFeature';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Code2, Gauge, Sparkles, X } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';
import { toast, ToastContainer } from 'react-toastify';


const ProgressTracker = () => {
  const phases = [
    { id: 1, name: "Meeting\nBooked", status: "current" },
    { id: 2, name: "Query Raised", status: "upcoming" },
    { id: 3, name: "Agreed to\nT&C", status: "upcoming" },
    { id: 4, name: "Task In\nProgress", status: "upcoming" },
    {id: 4, name:"Finish", status:"upcoming"}
  ];

  return (
    <div className="w-full py-4">
      <h3 className="mb-8 font-semibold">Project Timeline</h3>
      <div className="relative px-4">
        {/* Progress Line */}
        <div className="absolute top-[5px] left-0 w-full h-[2px] bg-gray-200">
          <div className="absolute top-0 left-0 h-full w-[25%] bg-black"></div>
        </div>
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex flex-col items-center" style={{ width: '80px' }}>
              <div 
                className={`w-2.5 h-2.5 rounded-full mb-4 z-10 ${
                  phase.status === 'current' ? 'bg-black' :
                  phase.status === 'completed' ? 'bg-black' : 'bg-gray-300'
                }`}
              />
              <span 
                className={`text-xs text-center whitespace-pre-line ${
                  phase.status === 'current' ? 'text-black font-medium' : 'text-gray-500'
                }`}
                style={{ lineHeight: '1.2' }}
              >
                {phase.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const TaskSidebar = ({ isOpen, onClose, service, bookingMessage, onConfirm }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-2 font-semibold">Service Details</h3>
            <p className="text-sm text-gray-600">{service.name}</p>
            <p className="mt-2 text-sm font-semibold">Starting from ${service.minPrice}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-2 font-semibold">Your Message</h3>
            <p className="text-sm text-gray-600">{bookingMessage}</p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <ProgressTracker />
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-2 font-semibold">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Initial consultation meeting will be scheduled</li>
              <li>• Team will review your requirements</li>
              <li>• You'll receive detailed project scope & terms</li>
              <li>• Once agreed, work begins immediately</li>
            </ul>
          </div>
          
          <button
            onClick={onConfirm}
            className="w-full py-3 text-white transition-colors bg-black rounded-lg hover:bg-neutral-800"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  if (faqs.length < 1) {
    return null;
  }

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
  const { serviceId } = useParams();
  const { services, user, addTask } = useStore();
  const thisService = services.find(service => service._id == serviceId);
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBookClick = () => {
    if (!user) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/login');
      return;
    }
    setShowBookingForm(true);
  };

  const handleSubmitBooking = () => {
    if (bookingMessage.trim()) {
      setIsSidebarOpen(true);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      await addTask(serviceId, user._id, bookingMessage);
      toast.success("Booking confirmed!");
      setBookingMessage('');
      setShowBookingForm(false);
      setIsSidebarOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!thisService) {
    return <div>Service not found</div>;
  }
  const TinyMCEContent = ({ content }) => {
  return (
    <div className="prose max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-gray-600 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
      />
    </div>
  );
};

  return (
    <>
      <div className="flex justify-between p-10 px-24 bg-gray-50">
        <div className="w-1/2">
          <img
            src={thisService.imageUrl}
            alt={thisService.name}
            className="object-cover w-full rounded-lg shadow-md h-96"
          />
          <div className="flex gap-4 mt-8">
            {thisService.tags?.map(tag => (
              <span key={tag} className="px-3 py-2 text-center bg-gray-200 border-2 border-gray-400 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <ServiceFeatures />
          </div>
          <FAQAccordion faqs={thisService.faqs} />
        </div>

        <div className="w-1/2 pl-10">
          <div className="p-4 px-8 border-2 border-gray-200 rounded-lg">
            <h1 className="flex items-center justify-between mb-4 text-2xl font-bold">
              {thisService.name} 
              <span className="flex items-center gap-2 px-4 py-1 text-sm font-medium bg-gray-200 rounded-full">
                From <span className='text-xl font-semibold'>${thisService.minPrice}</span>
              </span>
            </h1>
           
            <div className="mt-4 space-y-4 text-gray-700">
             <TinyMCEContent content={thisService.description} />
              <ul>
                <li className="flex items-center gap-2 my-2 text-sm text-black">
                  <Gauge size={20}/> Performance Optimized
                </li>
                <li className="flex items-center gap-2 my-2 text-sm text-black">
                  <Code2 size={20}/> Clean Modern Code
                </li>
                <li className="flex items-center gap-2 my-2 text-sm text-black">
                  <Sparkles size={20} /> SEO Best Practices
                </li>
              </ul>
              
              {!showBookingForm && (
                <button 
                  onClick={handleBookClick} 
                  className="w-full px-20 py-2 font-semibold text-white bg-black border-2 rounded-md hover:bg-neutral-800"
                >
                  Book Consultation
                </button>
              )}
            
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
                    Continue
                  </button>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="px-8 py-2 ml-4 text-black border-2 border-black rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <ReviewSection serviceId={serviceId} />
        </div>
      </div>

      <TaskSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        service={thisService}
        bookingMessage={bookingMessage}
        onConfirm={handleConfirmBooking}
      />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        theme="dark"
      />
    </>
  );
};

export default ServiceDetails;
