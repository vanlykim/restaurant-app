import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import RestaurantItem from "./RestaurantItem";
import Spinner from "./Spinner";
import {
  getRestaurants,
  reset,
} from "../features/restaurants/restaurantSlice.js";
import { getCollections } from "../features/collections/collectionSlice";
import { getRestaurantCollections } from "../features/restaurant-collections/restaurantCollectionSlice";

const RestaurantList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { restaurants, isLoading, isError, message } = useSelector(
    (state) => state.restaurants
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(
      getRestaurants({
        q: "",
        w: moment().day(),
        t: moment().format("HH:mm:ss"),
      })
    );
    dispatch(getCollections());
    dispatch(getRestaurantCollections());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container-fluid pb-4'>
      {restaurants.length > 0 ? (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3'>
          {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <h3>Restaurant not found</h3>
      )}
    </div>
  );
};
export default RestaurantList;
