import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h2 className='text-center text-dark mt-5'>
            <FaSignInAlt /> Login
          </h2>
          <div className='card my-5 border-0'>
            <form
              className='card-body cardbody-color p-lg-5'
              onSubmit={onSubmit}>
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
              <div className='text-center'>
                <button type='submit' className='btn btn-dark px-5 mb-5 w-100'>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
