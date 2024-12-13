import axios from 'axios';

const UNSPLASH_API_URL = "https://api.unsplash.com";
const ACCESS_KEY = "mRVvgncvb9UrOlfvpKkeOv3PFeszJ3bV24KpicX7Gdw"; 

// Create an Axios instance to configure the base URL and params
const unsplashApi = axios.create({
  baseURL: UNSPLASH_API_URL,
  params: {
    client_id: ACCESS_KEY, // Include the access key in the request params
  },
});

// Fetch random images
export const fetchRandomImages = async (count = 15, width = 800, height = 600) => {
  try {
    const response = await unsplashApi.get("/photos/random", {
      params: {
        count: count,   // Number of random images to fetch
        w: width,       // Desired width of the images
        h: height,      // Desired height of the images
      },
    });
    return response.data; // Return the list of images
  } catch (error) {
    console.error("Error fetching random images:", error);
    throw error; // Throw error to handle it in the calling component
  }
};


// Search images by query
export const searchImages = async (query) => {
  try {
    const response = await unsplashApi.get("/search/photos", {
      params: {
        query: query, // Search query
        per_page: 15,  // Number of images per page
      },
    });
    return response.data.results; // Return the search results
  } catch (error) {
    console.error("Error searching images:", error);
    throw error; // Throw error to handle it in the calling component
  }
};
