import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className='header d-flex align-items-center justify-content-between p-3'>
      <div className='logo fs-2'>
        <Link
          className='text-dark text-decoration-none font-weight-bold'
          to='/'>
          Restaurant
        </Link>
      </div>
      <div className='d-flex gap-3'>
        {user ? (
          <div className='d-flex gap-3 align-items-center'>
            <span className='d-none d-sm-inline'>Welcome, {user.name}!</span>
            <button className='btn btn-dark'>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        ) : (
          <>
            <Link className='text-dark text-decoration-none' to='/login'>
              <FaSignInAlt /> Login
            </Link>
            <Link className='text-dark text-decoration-none' to='/register'>
              <FaUser /> Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
