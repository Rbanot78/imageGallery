import React from 'react';
import { FaTimes, FaArrowDown } from 'react-icons/fa';
import './ImageModel.css'


const ImageModal = ({ image, onClose }) => {
  if (!image) return null; // Return nothing if there's no image

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 text-2xl z-50"
        >
          <FaTimes />
        </button>

        {/* Modal Image */}
        <img
          src={image.urls.regular}
          alt={image.alt_description || 'Image'}
          className="w-full max-h-[70vh] object-cover rounded-t-lg"
        />

        {/* Image Details */}
        <div className="p-6">
          <p className="font-bold text-lg text-gray-800">{image.user.name}</p>
          <p className="text-gray-600 text-sm mb-4">Resolution: {image.width} x {image.height}</p>

          {/* Download Button */}
          <div className="text-center">
            <a
              href={image.links.download}
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shake-horizontal-normal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
              <FaArrowDown className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
