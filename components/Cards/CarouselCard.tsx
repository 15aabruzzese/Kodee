import React from 'react';

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transform-gpu scale-90 hover:scale-100 transition-transform duration-300 ease-in-out bg-white" style={{borderRadius: '20px'}}>
      <img className="w-full" src={imageUrl} alt={title} style={{borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
