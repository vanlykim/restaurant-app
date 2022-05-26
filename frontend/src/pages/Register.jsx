import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h2 className='text-center text-dark mt-5'>
            <FaUser /> Register
          </h2>
          <div className='card my-5 border-0'>
            <form
              className='card-body cardbody-color p-lg-5'
              onSubmit={onSubmit}>
              <div className='mb-3'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  value={name}
                  onChange={onChange}
                  className='form-control'
                  placeholder='Enter your name'
                />
              </div>
              <div className='mb-3'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  value={email}
                  onChange={onChange}
                  className='form-control'
                  placeholder='Enter your email'
                />
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  id='password'
                  name='password'
                  required
                  value={password}
                  onChange={onChange}
                  className='form-control'
                  placeholder='Enter your password'
                />
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  id='password2'
                  name='password2'
                  required
                  value={password2}
                  onChange={onChange}
                  className='form-control'
                  placeholder='Confirm password'
                />
              </div>
              <div className='text-center'>
                <button type='submit' className='btn btn-dark px-5 mb-5 w-100'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
