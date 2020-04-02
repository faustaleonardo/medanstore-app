import React, { createContext, useReducer } from 'react';
import axiosInstance from '../../utils/axiosInstance';

import voucherReducer from './voucherReducer';

const initialState = {
  vouchers: [],
  error: null,
  isLoading: true
};

export const VoucherContext = createContext(initialState);
const { Provider } = VoucherContext;

export const VoucherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(voucherReducer, initialState);

  // actions
  const getVouchers = async () => {
    const response = await axiosInstance.get('/api/v1/vouchers');
    const vouchers = response.data.data.data;

    dispatch({ type: 'GET_VOUCHERS', payload: vouchers });
  };

  const addVoucher = async data => {
    const response = await axiosInstance.post('/api/v1/vouchers', data);
    const voucher = response.data.data.data;

    dispatch({ type: 'ADD_VOUCHER', payload: voucher });
  };

  const updateVoucher = async (id, data) => {
    const response = await axiosInstance.patch(`/api/v1/vouchers/${id}`, data);
    const voucher = response.data.data.data;

    dispatch({ type: 'UPDATE_VOUCHER', payload: voucher });
  };

  const deleteVoucher = async id => {
    await axiosInstance.delete(`/api/v1/vouchers/${id}`);

    dispatch({ type: 'DELETE_VOUCHER', payload: id });
  };

  const setError = data => {
    dispatch({ type: 'VOUCHER_ERROR', payload: data });
  };

  return (
    <Provider
      value={{
        vouchers: state.vouchers,
        error: state.error,
        isLoading: state.isLoading,
        getVouchers,
        addVoucher,
        updateVoucher,
        deleteVoucher,
        setError
      }}
    >
      {children}
    </Provider>
  );
};
