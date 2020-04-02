/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

import { ItemContext } from '../../context/items/itemState';
import { CartContext } from '../../context/carts/cartState';
import { AuthContext } from '../../context/auth/authState';
import formatCurrency from '../../utils/formatCurrency';

import ConditionCheckbox from './ConditionCheckbox';
import CategoryCheckbox from './CategoryCheckbox';
import SortDropdown from './SortDropdown';
import Loader from '../partials/Loader';

const ItemList = () => {
  const { items, setItems } = useContext(ItemContext);
  const { addCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const query = window.location.search;
  useEffect(() => {
    let queryStr = query ? query.replace(/[?]/, '') + '&' : '';
    const fetchItem = async () => {
      const response = await axiosInstance.get(
        `/api/v1/items/pictures?${queryStr}page=${page}`
      );
      const result = response.data.data.data;
      setItems(result);
    };

    const fetchCategories = async () => {
      const response = await axiosInstance.get('/api/v1/categories');
      const result = response.data.data.data;
      setCategories(result);
    };

    const hasNextPage = async () => {
      const response = await axiosInstance.get(
        `/api/v1/items/pictures?${queryStr}page=${page + 1}`
      );
      const result = response.data.data.data;
      if (result.length === 0) setNextPage(false);
      else setNextPage(true);
    };

    const fetchData = () => {
      setLoading(true);
      fetchItem();
      fetchCategories();
      hasNextPage();
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handleAddCart = item => {
    if (auth === false) return history.push('/login');

    addCart(item, 'add');
  };

  const renderContent = () => {
    return items.map(item => {
      return (
        <div className="col mb-5 text-center" key={item.id}>
          <div className="card item-card">
            <Link to={'/items/' + item.id}>
              <img
                src={item.pictures[0].path}
                className="card-img-top item-img"
                alt={item.name}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text text-success item-price">
                {formatCurrency(item.price)}
              </p>
              <button
                className="btn btn-success"
                onClick={() => handleAddCart(item)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderPaginate = () => {
    if (page === 1 && nextPage === false) return null;

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

  if (!items.length || !categories.length || nextPage === null || loading)
    return <Loader />;

  return (
    <div className="mt-5">
      <div className="clearfix">
        <ConditionCheckbox />
        <SortDropdown setPage={setPage} />
      </div>
      <div>
        <CategoryCheckbox categories={categories} />
      </div>
      <div className="row row-cols-1 row-cols-md-3 mt-5">{renderContent()}</div>
      {renderPaginate()}
    </div>
  );
};

export default ItemList;
