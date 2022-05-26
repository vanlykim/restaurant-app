import moment from "moment";
import { MdLibraryAdd } from "react-icons/md";

const RestaurantItem = ({ restaurant }) => {
  return (
    <>
      <div className='col' key={restaurant.id}>
        <div className='card h-100 text-start'>
          <div className='card-body'>
            <h5
              className='card-title'
              title={restaurant.name}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {restaurant.name}
            </h5>
            {restaurant.OpeningHours.map((openingHour) => (
              <p className='card-text' key={openingHour.id}>{`${moment(
                openingHour.open,
                ["h:mm A"]
              ).format("hh:mm A")} - ${moment(openingHour.close, [
                "h:mm A",
              ]).format("hh:mm A")}`}</p>
            ))}
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                className='btn btn-dark btn-sm d-flex align-items-center gap-1'>
                <MdLibraryAdd /> Add to collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RestaurantItem;
