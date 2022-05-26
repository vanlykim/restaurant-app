import axios from "axios";

const API_URL = "/api/collections";

// Create collection
const createCollection = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/collections", data, config);
  return response.data;
};

// Get collections
const getCollections = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const collectionService = {
  createCollection,
  getCollections,
};

export default collectionService;
