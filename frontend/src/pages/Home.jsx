import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import TopCollectionSlider from '../components/TopCollectionsSlider';
import TrendsBanner from '../components/TrendsBanner';
import ServiceFeatures from '../components/ServiceFeature';
import { Search,ChevronRight,Grid, Handshake, Zap, LifeBuoy } from 'lucide-react';
import useStore from '../store/store';

const FreelanceBenefits = () => {
  return (
    <div className="p-8 mx-auto max-w-4/5">
      <h1 className="mb-2 text-4xl font-bold text-gray-800">
        A whole world of freelance
      </h1>
      <h2 className="mb-20 text-4xl font-bold text-gray-800">
        talent at your fingertips
      </h2>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <BenefitCard
          icon={<Grid className="w-8 h-8" />}
          title="Over 700 categories"
          description="Get results from skilled freelancers from all over the world, for every task, at any price point."
        />
        <BenefitCard
          icon={<Handshake className="w-8 h-8" />}
          title="Clear, transparent pricing"
          description="Pay per project or by the hour (Pro). Payments only get released when you approve."
        />
        <BenefitCard
          icon={<Zap className="w-8 h-8" />}
          title="Quality work done faster"
          description="Filter to find the right freelancers quickly and get great work delivered in no time, every time."
        />
        <BenefitCard
          icon={<LifeBuoy className="w-8 h-8" />}
          title="24/7 award-winning support"
          description="Chat with our team to get your questions answered or resolve any issues with your orders."
        />
      </div>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-start w-[30ch]">
      <div className="mb-4 text-gray-600">{icon}</div>
      <h3 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h3>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
};

// const FreelanceSearch = () => {
//   return (
//     <div className="p-8 text-center text-white bg-green-900 rounded-lg">
//       <h1 className="mt-20 mb-12 text-4xl font-bold">
//         Find the right <span className="font-serif text-green-300">freelance</span><br />
//         service, right away
//       </h1>
      
//       <div className="flex mx-auto mb-8 sm:w-1/2">
//         <input
//           type="text"
//           placeholder="Search for any service..."
//           className="w-full p-3 text-gray-800 rounded-l-md"
//         />
//         <button className="p-3 bg-green-700 rounded-r-md">
//           <Search size={24} />
//         </button>
//       </div>
      
//       <TrustedBy />
//     </div>
//   );
// };
const FreelanceSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ services: [], categories: [] });

  // Function to handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`http://localhost:4000/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data); // Set the services and categories in the state
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Event handler for search button click or pressing Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="p-8 text-center text-white bg-green-900 rounded-lg">
      <h1 className="mt-20 mb-12 font-bold text-7xl">
        Find the right <span className="font-serif text-green-300">freelance</span><br />
        service, right away
      </h1>
      
      <div className="flex mx-auto mb-8 sm:w-1/2">
        <input
          type="text"
          placeholder="Search for any service..."
          className="w-full p-3 text-gray-800 rounded-l-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="p-3 bg-green-700 rounded-r-md">
          <Search size={24} />
        </button>
      </div>

      {/* Display search results */}
      <div className="mx-auto my-4 max-h-[30vh] overflow-y-scroll text-black bg-white rounded-lg sm:w-1/2">
        {results.services.length > 0 && (
          <div className='p-4'>
            <h3 className="mb-2 text-lg font-bold text-start">Services</h3>
            <ul className='flex flex-col items-start gap-2'>
              {results.services.map((service) => (
                <Link className='hover:text-blue-600' to={`/services/${service._id}`} key={service._id}>{service.name}</Link>
              ))}
            </ul>
          </div>
        )}
        {results.categories.length > 0 && (
          <div className='p-4'>
            <h3 className="mb-2 text-lg font-bold text-start">Categories</h3>
            <ul className='flex flex-col items-start gap-2'>
              {results.categories.map((category) => (
                <Link className='hover:text-blue-600' to={`/category/${category._id}`} key={category._id}>{category.name}</Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      <TrustedBy />
    </div>
  );
};
const TrustedBy = () => {
  const companies = ['Meta', 'Google', 'NETFLIX', 'P&G', 'PayPal', 'Payoneer'];
  return (
    <div className="flex items-center justify-center mx-auto mb-8 space-x-4 text-sm sm:w-1/2">
      <span>Trusted by:</span>
      {companies.map((company, index) => (
        <span key={index} className="font-semibold">{company}</span>
      ))}
    </div>
  );
};
const ServicesShowcase = () => {
  return (
    <div className="p-4 mx-auto my-8 max-w-4/5">
      <CategorySection />
      <PopularServicesSection />
    </div>
  );
};

const CategorySection = () => {
  const categories = [
    { icon: '💻', name: 'Programming & Tech' },
    { icon: '🎨', name: 'Graphics & Design' },
    { icon: '📱', name: 'Digital Marketing' },
    { icon: '✍️', name: 'Writing & Translation' },
    { icon: '🎥', name: 'Video & Animation' },
    { icon: '🤖', name: 'AI Services' },
    { icon: '🎵', name: 'Music & Audio' },
    { icon: '💼', name: 'Business' },
    { icon: '🤝', name: 'Consulting' },
  ];

  return (
    <div className="flex pb-4 space-x-4 overflow-x-auto">
      {categories.map((category, index) => (
        <div key={index} className="flex border-[1px] border-gray-200 flex-col w-[20ch] items-center bg-white p-4 rounded-lg shadow-md min-w-[120px]">
          <span className="mb-2 text-2xl">{category.icon}</span>
          <span className="text-lg text-center">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

const PopularServicesSection = () => {
  const services = [
    { title: 'Website Development', color: 'bg-green-600', image: '/api/placeholder/150/100' },
    { title: 'Logo Design', color: 'bg-orange-400', image: '/api/placeholder/150/100' },
    { title: 'SEO', color: 'bg-green-800', image: '/api/placeholder/150/100' },
    { title: 'Architecture & Interior Design', color: 'bg-purple-800', image: '/api/placeholder/150/100' },
    { title: 'Social Media Marketing', color: 'bg-pink-600', image: '/api/placeholder/150/100' },
    { title: 'Voice Over', color: 'bg-orange-700', image: '/api/placeholder/150/100' },
  ];

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-3xl font-semibold">Popular services</h2>
      <div className="flex gap-4">
        {services.map((service, index) => (
          <div key={index} className={`${service.color} rounded-lg w-[27ch] flex flex-col justify-between  overflow-hidden`}>
            <div className="p-4 font-semibold text-white">{service.title}</div>
            <div className="p-2 m-2 bg-white rounded">
              <img src={service.image} alt={service.title} className="object-cover w-full h-32 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Link to="/services">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            See more <ChevronRight size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className='px-24'>
      <FreelanceSearch />
      <ServicesShowcase />
      <FreelanceBenefits />
     
      <TrendsBanner />
      <TopCollectionSlider/>
      <ServiceFeatures />
      {/* <TopCollectionSlider/> */}
    </div>
  );
};

export default Home;