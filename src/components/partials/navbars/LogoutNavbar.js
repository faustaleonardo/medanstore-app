import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../../context/auth/authState';

const LogoutNavbar = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <li className="nav-item">
      <button
        className="btn btn-outline-secondary"
        onClick={() => handleLogout()}
      >
        Logout <span className="sr-only"></span>
      </button>
    </li>
  );
};

export default LogoutNavbar;
