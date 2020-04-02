/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

import { ItemContext } from '../../../context/items/itemState';
import { AuthContext } from '../../../context/auth/authState';
import WarningModal from '../../partials/WarningModal';
import formatCurrency from '../../../utils/formatCurrency';
import Loader from '../../partials/Loader';

const Item = () => {
  const { items, setItems, deleteItem } = useContext(ItemContext);
  const { auth } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axiosInstance.get(`/api/v1/items?page=${page}`);
      const result = response.data.data.data;
      setItems(result);
    };

    const hasNextPage = async () => {
      const response = await axiosInstance.get(
        `/api/v1/items/?page=${page + 1}`
      );
      const result = response.data.data.data;
      if (result.length === 0) setNextPage(false);
      else setNextPage(true);
    };

    fetchItem();
    hasNextPage();
  }, [page]);

  const renderContent = () => {
    return items.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{formatCurrency(item.price)}</td>
          <td>{item.stock}</td>
          <td>{item.condition}</td>
          <td>{item.ram}</td>
          <td>{item.storage}</td>
          <td className="text-center">
            <Link
              to={'/admin/items/' + item.id + '/update'}
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
              onClick={() => {
                setId(item.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderPaginate = () => {
    return (
      <nav aria-label="Page navigation" className="item-pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
          </li>
          <li className={`page-item ${nextPage === false ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  if (auth === false) return <Redirect to="/login" />;

  if (!items.length) return <Loader />;

  return (
    <Fragment>
      <WarningModal title="Delete an Item" id={id} action={deleteItem} />
      <div className="clearfix mt-5 mb-3">
        <div className="float-left">
          <h4>Item</h4>
        </div>
        <div className="float-right">
          <Link to="/admin/items/create" className="btn btn-success">
            New Item
          </Link>
        </div>
      </div>
      <table className="table table-bordered table-hover mb-5">
        <thead>
          <tr className="text-uppercase">
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Condition</th>
            <th>RAM</th>
            <th>Storage</th>
            <th className="text-center">Update</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
      {renderPaginate()}
    </Fragment>
  );
};

export default Item;
