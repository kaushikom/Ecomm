import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar';
import { Loader2, Star, ArrowLeft } from 'lucide-react';
import useStore from '../../store/store';

const ServiceCard = ({service, toggle, selectService}) =>{
const {getAverageRating} = useStore();
const [loading,setLoading] = useState(true);
const [rating,setRating] = useState();
const [reviews,setReviews] = useState();

const handleViewDetails = () => {
toggle(true);
selectService({id:service._id, name:service.name})
}

useEffect(() => {
  const fetchStats = async() => {
    console.log('Starting fetchStats for service:', service.name);
    setLoading(true)
    try {
      console.log('Calling getAverageRating with ID:', service._id);
      const response = await getAverageRating(service._id);
    
      
      if (!response || response.success === false) {
        console.log('No response or failed response for:', service.name);
        setRating(0)
        setReviews(0)
      } else {
        const {averageRating, numberOfReviews} = response;
       
        setRating(averageRating)
        setReviews(numberOfReviews)
      }
    } catch (error) {
      console.error('Error details:', error.message);
      setRating(0);
      setReviews(0);
    } finally {
      setLoading(false);
    }
  }
  
  fetchStats();
}, [service._id, service.name, getAverageRating]);

return (
    <div className="w-64 p-4 transition-all bg-white shadow-sm rounded-xl hover:-translate-y-2 hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900">{service.name}</h2>
      
      <div className="flex items-center mt-2 space-x-1">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <div className='flex items-center justify-between w-full mt-2'>
            <button className='flex items-center px-1 bg-gray-200 rounded-md'>
              <Star className="w-4 h-4 text-gray-900 fill-current" />
              <span className="font-semibold text-gray-900">{rating?.toFixed(1) || '0.0'}</span>
            </button>
            <span className="text-sm text-gray-500">
              {reviews === 1 ? '1 Review' : `${reviews || 0} Reviews`}
            </span>
          </div>
        )}
      </div>
      
      <button onClick={handleViewDetails}
        className="mt-4 text-sm font-medium text-gray-500 transition-colors hover:text-blue-700"
      >
        View Details
      </button>
    </div>
  );
};

const ServiceDetails = ({toggle, service}) => {
  const [loading,setLoading] = useState(true);
  const handleBack = () => {toggle(false)};
return(
  <div className='p-4 my-4 bg-white rounded-lg '>
    <div className='flex items-center gap-2'><button className='p-1 transition-colors bg-gray-200 rounded-full hover:bg-blue-200' onClick={handleBack}><ArrowLeft size={25}/></button> <h1 className='text-xl'>{service.name}</h1></div>
    {loading ? (<div className='flex justify-center'>
      <Loader2 className='animate-spin' size={40} />
    </div>) : (
      <div>
        Details
      </div>
    )}
  </div>
)
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

const AdminReviews = () => {
  const {services} = useStore();
  const [showService, setShowService] = useState(false);
  const [selectedService, setSelectedService] = useState({id:'',name:''})

  useEffect(() => {
    console.log("AdminReviews mounted");
    console.log("Current services:", services);
  }, [services]);

  return (
 <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className='flex-grow p-8'>
        <h1 className='text-4xl'>Reviews</h1>
    {showService ? (<ServiceDetails service={selectedService} toggle={setShowService} />):(
       <div className='flex flex-wrap gap-4 p-4'>
     {services?.map((service)=><ServiceCard selectService={setSelectedService} toggle={setShowService} service={service} key={service._id} />)}
        </div>
    )}
      </main>
    </div>
  )
}

export default AdminReviews