import React, { createContext, useReducer } from 'react';
import axiosInstance from '../../utils/axiosInstance';

import itemReducer from './itemReducer.js';

const initialState = {
  items: [],
  error: null
};

export const ItemContext = createContext(initialState);
const { Provider } = ItemContext;

export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);

  // actions
  const setItems = items => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  };

  const addItem = item => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateItem = item => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
  };

  const deleteItem = async id => {
    await axiosInstance.delete(`/api/v1/pictures/items/${id}`);
    await axiosInstance.delete(`/api/v1/items/${id}`);

    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  const setError = data => {
    dispatch({ type: 'ITEM_ERROR', payload: data });
  };

  return (
    <Provider
      value={{
        items: state.items,
        error: state.error,
        setItems,
        addItem,
        updateItem,
        deleteItem,
        setError
      }}
    >
      {children}
    </Provider>
  );
};
