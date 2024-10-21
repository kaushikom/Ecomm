import React from 'react';
import { Star } from 'lucide-react';

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      username: 'anmoig1999',
      country: 'India',
      rating: 3.7,
      date: '2 months ago',
      content: 'Websquadron delivered a decent website, but the work could benefit from better code expertise and attention to detail to align more closely with expectations. While collaborating was generally positive, improvement in delivery time and level of effort is needed. But working with them for a second time,...',
      isRepeatClient: true,
    },
  ];

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

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
      <div className="mb-4">
        <p className="font-semibold">176 reviews for this Gig</p>
        <div className="flex items-center">
          {renderStars(4.9)}
          <span className="ml-2">4.9</span>
        </div>
      </div>
      
      {reviews.map((review) => (
        <div key={review.id} className="p-4 mb-4 border rounded-lg">
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center w-10 h-10 mr-2 font-bold text-white bg-orange-500 rounded-full">
              {review.username[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{review.username}</p>
              <p className="text-sm text-gray-600">{review.country}</p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            {renderStars(review.rating)}
            <span className="ml-2">{review.rating}</span>
            <span className="ml-2 text-gray-600">{review.date}</span>
          </div>
          {review.isRepeatClient && (
            <p className="mb-2 text-sm text-gray-600">Repeat Client</p>
          )}
          <p className="text-sm">{review.content}</p>
          <div className="mt-2">
            <button className="mr-4 text-sm text-gray-600">Helpful?</button>
            <button className="text-sm text-gray-600">Yes</button>
            <button className="ml-2 text-sm text-gray-600">No</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;