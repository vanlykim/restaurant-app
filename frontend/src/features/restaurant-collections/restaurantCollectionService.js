import axios from "axios";

const API_URL = "/api/restaurant-collections";

// Add restaurant to collection
const addToRestaurantCollection = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    "/api/restaurant-collections",
    data,
    config
  );
  return response.data;
};

// Get all user restaurant collections
const getRestaurantCollections = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Remove restaurant from collection
const deleteFromRestaurantCollection = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `/api/restaurant-collections/${data.restaurantId}/${data.collectionId}`,
    config
  );
  return response.data;
};

const restaurantCollectionService = {
  addToRestaurantCollection,
  getRestaurantCollections,
  deleteFromRestaurantCollection,
};

export default restaurantCollectionService;
