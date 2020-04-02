import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <Fragment>
      <li className="nav-item ml-2">
        <Link to="/signup" className="btn btn-outline-success my-2 my-sm-0">
          Signup <span className="sr-only"></span>
        </Link>
      </li>
      <li className="nav-item ml-2">
        <Link to="/login" className="btn btn-success my-2 my-sm-0">
          Login <span className="sr-only"></span>
        </Link>
      </li>
    </Fragment>
  );
};

export default AdminNavbar;
