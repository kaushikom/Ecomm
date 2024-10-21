import React from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

const FashionTrendsParallax = () => {
  return (
    <ParallaxProvider>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Single image containing model and background */}
        <Parallax translateY={[-10, 50]} className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/18069363/pexels-photo-18069363/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-how-ai-could-help-understand-ecosystems-and-identify-species-it-was-created-by-nidia-dias-as-part-of-the-visua.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Fashion model with background" 
            className="object-cover w-full h-full"
          />
        </Parallax>

        {/* Text group */}
        <Parallax
          translateY={[-40, 50]}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="p-6 text-center bg-white rounded-lg bg-opacity-70">
            <h1 className="text-6xl font-bold text-red-500">2024</h1>
            <h2 className="text-4xl font-semibold text-gray-800">STARTUP'S FAVOURITE</h2>
            <p className="text-xl text-gray-600">SPECIAL OFFER</p>
          </div>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

export default FashionTrendsParallax;