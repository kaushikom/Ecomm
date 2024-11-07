import React, { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import useStore from '../store/store';
import DateFormatter from './DateFormatter';

const ReviewSection = ({serviceId}) => {
 const {getReviewsByService, getAverageRating} = useStore();
 const [reviews, setReviews] = useState([]);
 const [avgRating, setAvgRating] = useState();
 const [totalReviews, setTotalReviews] = useState();
 const [loading, setLoading] = useState();

 const fetchReviews = async()=>{
  setLoading(true);
  try {
    const reviews = await getReviewsByService(serviceId);
    const {averageRating,numberOfReviews} = await getAverageRating(serviceId);
    setAvgRating(averageRating)
    setTotalReviews(numberOfReviews)
    setReviews(reviews);
  } catch (error) {
    console.log("Error fetching reviews: ",error)
  }finally{
    setLoading(false);
  }
 }
 
 useEffect(()=>{fetchReviews()},[])

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            fill={index < fullStars ? 'currentColor' : 'none'}
            color={index < fullStars || (index === fullStars && hasHalfStar) ? 'gold' : 'gray'}
          />
        ))}
      </div>
    );
  };

  if(loading) return <Loader2 className='animate-spin' />
  if(reviews.length < 1) return 

  return (
    <div className="max-w-2xl p-4 mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
      <div className="mb-4">
        <p className="font-semibold">{totalReviews} Reviews</p>
        <div className="flex items-center">
          {renderStars(avgRating)}
          <span className="ml-2">{avgRating}</span>
        </div>
      </div>
      
      {reviews.map((review) => (
        <div key={review._id} className="p-4 mb-4 border rounded-lg">
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center w-10 h-10 mr-2 font-bold text-white bg-orange-500 rounded-full">
              {review.user.firstName[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{review.user.firstName} {review.user.lastName}</p>
              <p className="text-sm text-gray-600">{review.user.company}</p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            {renderStars(review.rating)}
            <span className="ml-2">{review.rating}</span>
            <span className="ml-2 text-gray-600"><DateFormatter date={review.createdAt}/></span>
          </div>
         
          <p className="text-sm">{review.description}</p>
        
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;