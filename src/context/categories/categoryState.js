import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import categoryReducer from './categoryReducer';

const initialState = {
  categories: [],
  error: null,
  isLoading: true
};

export const CategoryContext = createContext(initialState);
const { Provider } = CategoryContext;

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  // actions
  const getCategories = async () => {
    const response = await axios.get('/api/v1/categories');
    const categories = response.data.data.data;

    dispatch({ type: 'GET_CATEGORIES', payload: categories });
  };

  const addCategory = async data => {
    const response = await axios.post('/api/v1/categories', data);
    const category = response.data.data.data;

    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  const updateCategory = async (id, data) => {
    const response = await axios.patch(`/api/v1/categories/${id}`, data);
    const category = response.data.data.data;

    dispatch({ type: 'UPDATE_CATEGORY', payload: category });
  };

  const deleteCategory = async id => {
    await axios.delete(`/api/v1/categories/${id}`);

    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  const setError = data => {
    dispatch({ type: 'CATEGORY_ERROR', payload: data });
  };

  return (
    <Provider
      value={{
        categories: state.categories,
        error: state.error,
        isLoading: state.isLoading,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        setError
      }}
    >
      {children}
    </Provider>
  );
};
