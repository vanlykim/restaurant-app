import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSave, FaPlus } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { createCollection } from "../features/collections/collectionSlice";

const CollectionModal = ({ show = false, onHide, restaurantId }) => {
  const [newCollection, setNewCollection] = useState(false);
  const collectionNameRef = useRef();
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collections);

  return (
    <Modal show={show} onHide={onHide} size='sm' centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Save to...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {collections.length > 0 ? (
          <div className='collections'>
            {collections.map((collection) => (
              <div className='form-check' key={collection.id}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value={collection.id}
                  id={`collection${collection.id}`}
                />
                <label
                  className='form-check-label'
                  htmlFor={`collection${collection.id}`}>
                  {collection.name}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <h5>No collection found</h5>
        )}
      </Modal.Body>
      <Modal.Footer className='p-2'>
        {newCollection ? (
          <form
            className='d-flex flex-column w-100 gap-2'
            onSubmit={() => {
              dispatch(
                createCollection({ name: collectionNameRef.current.value })
              );
              setNewCollection(false);
            }}>
            <input
              type='text'
              ref={collectionNameRef}
              required
              className='form-control form-control-sm'
              placeholder='Enter collection name...'
            />
            <button
              type='submit'
              className='btn btn-dark btn-sm d-flex align-items-center justify-content-center gap-1'>
              <FaSave /> Save
            </button>
          </form>
        ) : (
          <div className='d-flex flex-column w-100 gap-2'>
            <button
              type='button'
              className='btn btn-dark btn-sm d-flex align-items-center justify-content-center gap-1'
              onClick={() => setNewCollection(true)}>
              <FaPlus /> Create new collection
            </button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default CollectionModal;
