import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../store/store'; // Import Zustand store
import ServiceFeatures from '../components/ServiceFeature';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {Slider} from 'rsuite'
import ReviewSection from '../components/ReviewSection';
import 'rsuite/Slider/styles/index.css';

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
   const { categoryId, taskId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  
  const categories = useStore((state) => state.categories);
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  
  const category = categories.find((cat) => cat.id === parseInt(categoryId));
  const service = category?.tasks.find((task) => task.id === parseInt(taskId));
  const [selectedPrice, setSelectedPrice] = useState(service.maxPrice);

  // Set the default selected price to the minimum price when the component loads
  useEffect(() => {
    if (service) {
      setSelectedPrice(service.minPrice);
    }
  }, [service]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${service.name} to cart for $${selectedPrice}`);
    console.log(service)
    addToCart(category.id,service);
    console.log(cart);
      navigate('/cart');
  };

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <>
      <div className="flex justify-between p-10 bg-gray-50">
        {/* Left Section: Image */}
        <div className="w-1/2">
          <img
            src={service.image}
            alt={service.name}
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
          <h1 className="mb-4 text-4xl font-bold">{service.name}</h1>
          <p className="mb-6 text-gray-600">{service.description}</p>

          {/* Price Range Section */}
          {/* <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold">
              Select Price: ${selectedPrice}
            </label>
            <div className="w-full sm:w-1/2">
            <Slider
          progress
          style={{ marginTop: 16, marginBottom : 16 }}
          min={service.minPrice}
          max={service.maxPrice}
          value={selectedPrice}
          onChange={value => {
            setSelectedPrice(value);
          }}
        />
            </div>
            <div className="flex justify-between text-gray-600 sm:w-1/2">
              <span>${service.minPrice}</span>
              <span>${service.maxPrice}</span>
            </div>
            <p className="mt-4 font-bold text-gray-500 text-md">
              *Our prices are dependent on the complexity of the project
            </p>
          </div> */}
          <div>Price : ${service.minPrice} - ${service.maxPrice}</div>

          {/* Quantity Input */}
          {/* <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 text-lg font-semibold">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 px-3 py-2 text-center border rounded"
            />
          </div> */}

          {/* Action Buttons */}
          <div className="flex mb-6 space-x-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Add to Cart
            </button>
            <button className="px-6 py-2 text-white bg-orange-500 rounded hover:bg-orange-600">
              Buy Now
            </button>
          </div>

          {/* Offers Section */}
          <div className="space-y-4 text-gray-700">
            <h3 className="font-bold">Product Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              consectetur rerum ad modi magni aliquam odit, amet, provident
              maiores maxime beatae ducimus alias quas quae sunt, nobis
              consequuntur et quia minima nesciunt esse assumenda cupiditate
              quos.
            </p>
            <button className='px-20 py-2 font-semibold border-2 border-black hover:bg-black hover:text-white'>Contact Us</button>
          </div>
          <ReviewSection />
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;

