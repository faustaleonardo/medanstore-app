import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authState';

import renderWarningAlert from '../../utils/renderWarningAlert';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      await login({ username, password });
      setError(null);
      history.push('/');
    } catch (err) {
      resetField();
      setError(err.response.data);
    }
  };

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
