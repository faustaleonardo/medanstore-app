import React from 'react';

const LogoutNavbar = () => {
  return (
    <li className="nav-item">
      <a href="/api/v1/auth/logout" className="nav-link">
        Logout <span className="sr-only"></span>
      </a>
    </li>
  );
};

export default LogoutNavbar;
