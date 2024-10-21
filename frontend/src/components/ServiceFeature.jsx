import React from 'react';
import { Truck, Clock, Megaphone } from 'lucide-react';

const ServiceFeature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-4 text-center border-r last:border-r-0">
    <Icon className="w-12 h-12 mb-2 text-red-500" />
    <h3 className="mb-1 text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ServiceFeatures = () => {
  const features = [
    {
      icon: Truck,
      title: "FAST SHIPPING",
      description: "Fast development and deployment"
    },
    {
      icon: Clock,
      title: "24 X 7 SERVICE",
      description: "Online Service For 24 x 7"
    },
    {
      icon: Megaphone,
      title: "FESTIVAL OFFER",
      description: "New Online Special Festival Offer"
    }
  ];

  return (
    <div className="flex items-stretch justify-center gap-12 border rounded-lg shadow-sm">
      {features.map((feature, index) => (
        <ServiceFeature key={index} {...feature} />
      ))}
    </div>
  );
};

export default ServiceFeatures;