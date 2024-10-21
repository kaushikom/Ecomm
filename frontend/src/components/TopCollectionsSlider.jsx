import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'SEO',
    price: 184.00,
    originalPrice: 230.00,
    rating: 4,
    image: 'https://electricenjin.com/img/cms/blogimageassets/What-You-Should-Know-About-Optimizing-Your-Website-for-Performance.jpg',
   
  },
  {
    id: 2,
    name: 'Consulting',
    price: 72.60,
    originalPrice: 121.00,
    rating: 4,
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
   
  },
  {
    id: 3,
    name: 'Web development',
    price: 261.00,
    originalPrice: 290.00,
    rating: 4,
    image: 'https://www.qanmos.com/wp-content/uploads/2024/07/1685618197hitech-56458a.jpg',
   
  },
  {
    id: 4,
    name: 'App Development',
    price: 94.50,
    originalPrice: 315.00,
    rating: 4,
    image: "https://ik.trn.asia/uploads/2024/01/1706240490715.png"
  
  },
];

const TopCollectionSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const visibleProducts = [
    products[startIndex],
    products[(startIndex + 1) % products.length],
    products[(startIndex + 2) % products.length],
    products[(startIndex + 3) % products.length],
  ];

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <p className="text-center text-red-500">Special Offer</p>
      <h2 className="mt-2 mb-2 text-3xl font-bold text-center">TOP SERVICES</h2>
      <div className="w-16 h-1 mx-auto mb-4 bg-red-500"></div>
      <p className="mb-8 text-center text-gray-600">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industry's standard dummy text ever since the 1500s.
      </p>
      <div className="relative">
        <div className="flex items-center justify-between">
          {visibleProducts.map((product) => (
            <div key={product.id} className="w-1/4 px-2">
              <img src={product.image} alt={product.name} className="w-full h-auto mb-2" />
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-yellow-400 ${i < product.rating ? 'fill-current' : 'stroke-current'}`}>★</span>
                ))}
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p>
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <span className="ml-2 text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 p-2 transform -translate-y-1/2 bg-white rounded-full shadow top-1/2"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 p-2 transform -translate-y-1/2 bg-white rounded-full shadow top-1/2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TopCollectionSlider;