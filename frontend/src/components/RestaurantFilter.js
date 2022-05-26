import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, DateTimePicker } from "react-rainbow-components";
import moment from "moment";
import { getRestaurants } from "../features/restaurants/restaurantSlice";
import { FaSearch } from "react-icons/fa";

const RestaurantFilter = () => {
  const [query, setQuery] = useState("");
  const [datetime, setDatetime] = useState(new Date());
  const dispatch = useDispatch();

  return (
    <div className='container-fluid p-3 pt-0'>
      <div className='row row-cols-1 row-cols-md-2 g-3'>
        <div className='col'>
          <Input
            placeholder='Search...'
            iconPosition='right'
            icon={<FaSearch className='rainbow-color_gray-3' />}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.toLowerCase());
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(
                  getRestaurants({
                    q: query,
                    w: moment(datetime).day(),
                    t: moment(datetime).format("HH:mm:ss"),
                  })
                );
              }
            }}
          />
        </div>
        <div className='col'>
          <DateTimePicker
            value={datetime}
            onChange={(value) => {
              setDatetime(value);
              dispatch(
                getRestaurants({
                  q: query,
                  w: moment(value).day(),
                  t: moment(value).format("HH:mm:ss"),
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default RestaurantFilter;
