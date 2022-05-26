import axios from "axios";

const API_URL = "/api/restaurants";

// Get restaurants
const getRestaurants = async ({ q, w, t }) => {
  const response = await axios.get(`${API_URL}?q=${q}&w=${w}&t=${t}`);
  return response.data;
};

const restaurantService = {
  getRestaurants,
};

export default restaurantService;
