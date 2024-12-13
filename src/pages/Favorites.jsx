import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageCard from '../components/ImageCard';
import ImageModal from '../components/ImageModal';
import { FaHome, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleRemoveFromFavorites = (imageId) => {
    const updatedFavorites = favorites.filter((image) => image.id !== imageId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.info('Removed from favorites');
  };

  return (
    <div className="bg-gradient-to-tr from-purple-300 via-purple-500 to-transparent min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            to="/"
            className="p-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-800 transition-all duration-300"
          >
            <FaHome />
          </Link>

          <h1 className="text-3xl font-bold text-black">Favorites</h1>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.length === 0 ? (
            <p className="text-center text-white">No favorite images saved.</p>
          ) : (
            favorites.map((image) => (
              <div key={image.id} className="relative group">
                <ImageCard
                  image={image}
                  onClick={() => handleImageClick(image)}
                  isFavorite={true}
                  onToggleFavorite={() => handleRemoveFromFavorites(image.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;
