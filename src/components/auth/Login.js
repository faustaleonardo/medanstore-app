/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authState';

import renderWarningAlert from '../../utils/renderWarningAlert';
import Loader from '../partials/Loader';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { login, setError, error } = useContext(AuthContext);

  useEffect(() => {
    setError(null);
  }, []);

  const resetField = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!username || !password) {
      return setError('Username and password must be filled!');
    }

    try {
      setLoading(true);
      await login({ username, password });
      setLoading(false);
      setError(null);
      history.push('/');
    } catch (err) {
      setLoading(false);
      resetField();
      setError(err.response.data);
    }
  };

  if (loading === true) return <Loader />;

  return (
    <div className="center-vh auth-section">
      {renderWarningAlert(error)}

      <div className="card">
        <div className="card-header">Welcome back!</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
