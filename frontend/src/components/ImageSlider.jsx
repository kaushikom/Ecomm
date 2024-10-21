import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PromoImage from './PromoImage';

const images = [
  'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg',
  'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <>
    <div className="flex flex-col w-full h-screen mb-8">
      <div className="p-4">
        <div className="text-xl">Welcome To Code Backward Lab</div>
        <div className="mt-2 text-4xl font-bold">Trending Services</div>
      </div>
      <div className="relative flex-grow overflow-hidden rounded-lg">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <button
          onClick={goToPrevious}
          className="absolute z-10 p-2 transform -translate-y-1/2 bg-white rounded-full top-1/2 left-4"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute z-10 p-2 transform -translate-y-1/2 bg-white rounded-full top-1/2 right-4"
        >
          <ChevronRight />
        </button>
        <button className="absolute z-10 px-4 py-2 text-white bg-red-500 bottom-8 left-8">
          BUY NOW
        </button>
      </div>
    </div>
    <div className="flex justify-center gap-8 mt-20">
        <PromoImage
          imageUrl="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg"
          gender="SEO"
          discount="10%"
        />
        <PromoImage
          imageUrl="https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          gender="WEB Development"
          discount="10%"
        />
      </div>
    </>
  );
};

export default ImageSlider;

