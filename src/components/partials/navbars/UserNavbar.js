import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/carts/cartState';

import LogoutNavbar from './LogoutNavbar';

const UserNavbar = () => {
  const { countQuantity } = useContext(CartContext);

  return (
    <Fragment>
      <li className="nav-item">
        <button
          type="button"
          className="btn btn-light btn-cart"
          data-toggle="modal"
          data-target="#cartModal"
        >
          <i className="fas fa-cart-arrow-down"></i> Cart{' '}
          <div className="text-success small-text-cart">{countQuantity()}</div>
        </button>
      </li>
      <li className="nav-item">
        <Link to="/orders" className="nav-link">
          Orders <span className="sr-only"></span>
        </Link>
      </li>
      <LogoutNavbar />
    </Fragment>
  );
};

export default UserNavbar;
