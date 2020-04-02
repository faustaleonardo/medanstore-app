import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authState';

import UserNavbar from './navbars/UserNavbar';
import GuestNavbar from './navbars/GuestNavbar';
import AdminNavbar from './navbars/AdminNavbar';
import GuestAndUserNavbar from './navbars/GuestAndUserNavbar';
import CartModal from './CartModal';

const Header = () => {
  const { auth } = useContext(AuthContext);

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return <GuestNavbar />;
      default:
        return auth && auth.roleId === 1 ? <AdminNavbar /> : <UserNavbar />;
    }
  };

  return (
    <Fragment>
      <CartModal />

      <nav className="navbar navbar-expand-lg navbar-light mb-4 pl-0 pr-0">
        <Link to="/" className="navbar-brand text-uppercase">
          medanstore
        </Link>
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav">
          <GuestAndUserNavbar />
          {renderContent()}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Header;
