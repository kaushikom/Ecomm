import React from 'react';

const PromoImage = ({ imageUrl, gender, discount }) => {
  return (
    <div className="relative overflow-hidden rounded-md group">
      <div className="transition-transform duration-300 ease-in-out group-hover:scale-110">
        <img src={imageUrl} alt={`${gender} fashion`} className="object-cover w-auto h-[400px]" />
      </div>
      <div className="absolute top-0 right-0 p-4 text-right">
        <p className="font-bold text-red-500">{discount} OFF</p>
        <h2 className="text-4xl font-bold text-white">{gender.toUpperCase()}</h2>
      </div>
    </div>
  );
};

export default PromoImage;