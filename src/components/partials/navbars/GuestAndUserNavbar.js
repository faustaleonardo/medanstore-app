import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth/authState';
import { Link } from 'react-router-dom';

const GuestAndUserNavbar = () => {
  const { auth } = useContext(AuthContext);
  if (auth === false || (auth && auth.roleId === 2)) {
    return (
      <li className="nav-item">
        <Link to="/items" className="nav-link">
          Items <span className="sr-only"></span>
        </Link>
      </li>
    );
  }
  return null;
};

export default GuestAndUserNavbar;
