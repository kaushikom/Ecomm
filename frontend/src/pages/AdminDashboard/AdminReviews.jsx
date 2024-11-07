import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar';
import { Loader2, Star, ArrowLeft, Pencil, Trash, X, Copy, CheckCircle } from 'lucide-react';
import useStore from '../../store/store';
import { ToastContainer, toast } from 'react-toastify';
import DateFormatter from '../../components/DateFormatter'

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
  const {getReviewsByService} = useStore();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  
  const handleBack = () => {toggle(false)};
  
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByService(service.id);
      console.log(data);
      setReviews(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const ReviewsCard = ({ review }) => {
    const { updateReview, deleteReview } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(review.rating);
    const [description, setDescription] = useState(review.description);
    const [copied,setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(review.task);
        setCopied(true);
        // toast.success("Task Id copied");
        setTimeout(()=>setCopied(false),1000);
      } catch (error) {
        console.log('Failed to copy: ',error)
      }
    }

    const renderStars = (editable = false) => {
      const stars = [];
      const totalStars = 5;

      for (let i = 1; i <= totalStars; i++) {
        stars.push(
          <Star
            key={i}
            size={20}
            className={`${
              i <= (editable ? rating : review.rating)
                ? 'fill-gray-900 cursor-pointer'
                : 'fill-gray-200 text-gray-300 cursor-pointer'
            }`}
            onClick={() => editable && setRating(i)}
          />
        );
      }
      return stars;
    };

    const handleUpdate = async () => {
      try {
        await updateReview(review._id, rating, description);
        toast.success('Review updated successfully');
        setIsEditing(false);
        // Fetch fresh data after successful update
        fetchReviews();
      } catch (error) {
        toast.error(error.message);
      }
    };

    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this review?')) {
        try {
          await deleteReview(review._id);
          toast.success('Review deleted successfully');
          // Fetch fresh data after successful deletion
          fetchReviews();
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    return (
      <div className='p-4 mt-8 border-2 border-gray-200 rounded-md'>
        {/* User header */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-start gap-4'>
            {/* Left */}
            <div className='flex'>
              {/* Profile avatar */}
              <div className='flex items-center justify-center w-12 text-xl text-gray-700 bg-gray-200 rounded-full aspect-square'>
                {review.user.firstName.charAt(0).toUpperCase()}
                {review.user.lastName.charAt(0).toUpperCase()}
              </div>
            </div>
            {/* Right */}
            <div>
              <h1 className='font-bold'>{review.user.firstName}</h1>
              <h3 className='font-light text-gray-600'>{review.user.email}</h3>
              <h3 className='mt-2 text-xs font-medium text-gray-800'><button
        onClick={handleCopy}
        className={`p-1 px-4 hover:bg-gray-300 transition-colors ${copied ? 'bg-green-400 hover:bg-green-400' : 'bg-gray-200'} rounded-full`}
        title="Copy task ID"
      >
        {copied ? 'Copied' : 'Copy Task ID'}
      </button></h3>
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              {renderStars(true)}
              <span className='ml-2 text-gray-600'>{rating}.0</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows="3"
            />
            <div className='flex gap-2'>
              <button
                onClick={handleUpdate}
                className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
              >
                Update
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setRating(review.rating);
                  setDescription(review.description);
                }}
                className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className='flex items-center my-2'>
              {renderStars()}
              <span className='ml-2 text-gray-600'>{review.rating}.0</span>
            </div>
            <p className='my-2'>{review.description}</p>
            <p className='text-sm text-gray-500'>
              <DateFormatter date={review.createdAt} />
            </p>
          </>
        )}
        {/* Admin Actions */}
        <div className={`flex gap-2 mt-4 ${isEditing ? 'hidden' : ''}`}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className='p-3 text-white transition-transform bg-black rounded-full hover:shadow-md hover:-translate-y-1'
          >
            {isEditing ? <X size={20} /> : <Pencil size={18} />}
          </button>
          <button
            onClick={handleDelete}
            className='p-3 text-white transition-transform bg-red-600 rounded-full hover:-translate-y-1'
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='p-4 my-4 bg-white rounded-lg'>
      <div className='flex items-center gap-2'>
        <button 
          className='p-1 transition-colors bg-gray-200 rounded-full hover:bg-blue-200' 
          onClick={handleBack}
        >
          <ArrowLeft size={25}/>
        </button> 
        <h1 className='text-xl'>{service.name}</h1>
      </div>
      {loading ? (
        <div className='flex justify-center'>
          <Loader2 className='animate-spin' size={40} />
        </div>
      ) : (
        <div className='flex'>
          {(reviews.length === 0) && (
            <div className='my-8 ml-4'>No reviews yet.</div>
          )}
          {reviews?.map(review => (
            <ReviewsCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};


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
       <ToastContainer position='top-center' autoClose={500} hideProgressBar={true} theme='dark' />
    </div>
  )
}

export default AdminReviews