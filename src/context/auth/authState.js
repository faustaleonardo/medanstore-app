import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import authReducer from './authReducer';

const initialState = {
  auth: null,
  error: null
};

export const AuthContext = createContext(initialState);
const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // actions
  const fetchUser = async () => {
    const response = await axios.get('/api/v1/auth/user');
    dispatch({ type: 'FETCH_USER', payload: response.data.data.data });
  };

  const login = async data => {
    const response = await axios.post('/api/v1/auth/login', data);
    const user = response.data.data.data;

    dispatch({ type: 'LOGIN', payload: user });
  };

  const signup = async data => {
    const response = await axios.post('/api/v1/auth/signup', data);
    const user = response.data.data.data;

    dispatch({ type: 'SIGNUP', payload: user });
  };

  const setError = data => {
    dispatch({ type: 'AUTH_ERROR', payload: data });
  };

  return (
    <Provider
      value={{
        auth: state.auth,
        error: state.error,
        fetchUser,
        login,
        signup,
        setError
      }}
    >
      {children}
    </Provider>
  );
};
