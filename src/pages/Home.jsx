import React, { useState, useEffect } from 'react';
import { fetchRandomImages, searchImages } from '../utils/api';
import ImageCard from '../components/ImageCard';
import ImageModal from '../components/ImageModal';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { FaHome, FaAngellist, FaBars, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify'; 

const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    loadImages();
  }, [page]); // Add 'page' as a dependency for infinite scrolling

  const loadImages = async () => {
    setLoading(true);
    try {
      const fetchedImages = await fetchRandomImages(15, page);
      setImages((prevImages) => [...prevImages, ...fetchedImages]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const searchResults = await searchImages(query, 1); // Always search from page 1
      setImages(searchResults);
      setPage(1); // Reset the page for subsequent scroll loading
    } catch (error) {
      console.error("Error searching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleToggleFavorite = (image) => {
    const isFavorite = favorites.some((fav) => fav.id === image.id);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== image.id);
      toast.info('Removed from favorites');
    } else {
      updatedFavorites = [...favorites, image];
      toast.success('Added to favorites');
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-tr from-purple-300 via-purple-500 to-transparent min-h-screen">
      <div className="relative mb-6 flex justify-between items-center p-4 flex-col sm:flex-row">
        {/* Hamburger Button - now aligned to the right with increased z-index and black background */}
        <div className="sm:hidden absolute top-4 right-4 p-2 z-50 bg-black rounded-full" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
        </div>

        {/* Mobile Menu - only visible when hamburger menu is open */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 right-0 bg-fuchsia-600 p-4 rounded-b-lg z-40">
            <Link
              to="/"
              className="block p-2 m-2 text-white rounded-lg hover:bg-fuchsia-800 transition-all duration-300"
              onClick={toggleMenu}
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/favorites"
              className="block p-2 m-2 text-white rounded-lg hover:bg-fuchsia-800 transition-all duration-300"
              onClick={toggleMenu}
            >
              <FaAngellist /> Favorites
            </Link>
          </div>
        )}

        {/* Search Bar - center it on mobile */}
        <SearchBar onSearch={handleSearch} className="w-full  items-center" />

        {/* Desktop Menu - visible on screens larger than 653px */}
        <div className="hidden sm:flex justify-end items-center space-x-4">
          <Link
            to="/"
            className="p-2 m-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-800 transition-all duration-300"
          >
            <FaHome />
          </Link>

          <Link
            to="/favorites"
            className="p-2 m-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-800 transition-all duration-300"
          >
            <FaAngellist />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.length === 0 ? (
          <p className="text-center text-white">No results found</p>
        ) : (
          images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={handleImageClick}
              isFavorite={favorites.some((fav) => fav.id === image.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </div>

      {loading && (
        <div className="flex justify-center my-4">
          <p className="text-white">Loading more images...</p>
        </div>
      )}

      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
