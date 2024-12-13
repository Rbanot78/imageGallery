import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './ImageCard.css';

const ImageCard = ({ image, onClick, isFavorite, onToggleFavorite }) => {
  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent triggering the onClick for the image
    onToggleFavorite(image);
  };

  return (
    <div className="relative group cursor-pointer">
      {/* Image */}
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className="w-full h-60 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-90"
        onClick={() => onClick(image)}
      />

      {/* Overlay */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-30 flex justify-center items-center rounded-lg"
        onClick={() => onClick(image)}
      >
        <p className="text-white text-center font-semibold">{image.user.name}</p>
      </div>

      {/* Favorite Icon */}
      <div
        className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-100"
        onClick={handleFavoriteToggle}
      >
        {isFavorite ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default ImageCard;