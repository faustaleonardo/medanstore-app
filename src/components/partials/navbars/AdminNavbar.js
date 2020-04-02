import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import LogoutNavbar from './LogoutNavbar';

const AdminNavbar = () => {
  return (
    <Fragment>
      <li className="nav-item">
        <Link to="/admin/categories" className="nav-link">
          Category <span className="sr-only"></span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/items" className="nav-link">
          Item <span className="sr-only"></span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/vouchers" className="nav-link">
          Voucher <span className="sr-only"></span>
        </Link>
      </li>
      <LogoutNavbar />
    </Fragment>
  );
};

export default AdminNavbar;
