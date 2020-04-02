/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { CategoryContext } from '../../../context/categories/categoryState';
import WarningModal from '../../partials/WarningModal';
import { AuthContext } from '../../../context/auth/authState';
import Loader from '../../partials/Loader';

const Category = () => {
  const { categories, getCategories, deleteCategory, isLoading } = useContext(
    CategoryContext
  );
  const { auth } = useContext(AuthContext);

  const [id, setId] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const renderContent = () => {
    return categories.map(category => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.value}</td>
          <td className="text-center">
            <Link
              to={'/admin/categories/' + category.id + '/update'}
              className="btn btn-outline-success"
            >
              Update
            </Link>
          </td>
          <td className="text-center">
            <button
              className="btn btn-outline-danger"
              data-toggle="modal"
              data-target="#warningModal"
              onClick={() => setId(category.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const render = () => {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="text-uppercase">
            <th>Id</th>
            <th>Value</th>
            <th className="text-center">Update</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
    );
  };

  if (isLoading) return <Loader />;
  if (auth === false) return <Redirect to="/login" />;
  else if (auth && Object.keys(auth).length && auth.roleId === 2)
    return <Redirect to="/" />;

  if (!categories.length) {
    return (
      <div className="center-vh">
        <h3>No record yet :(</h3>
      </div>
    );
  }

  return (
    <Fragment>
      <WarningModal title="Delete a Category" id={id} action={deleteCategory} />

      <div className="clearfix mt-5 mb-3">
        <div className="float-left">
          <h4>Category</h4>
        </div>
        <div className="float-right">
          <Link to="/admin/categories/create" className="btn btn-success">
            New Category
          </Link>
        </div>
      </div>
      {render()}
    </Fragment>
  );
};

export default Category;
