import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authState';

import renderWarningAlert from '../../utils/renderWarningAlert';
import validateEmail from '../../utils/validateEmail';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const history = useHistory();
  const { signup, setError, error } = useContext(AuthContext);

  useEffect(() => {
    setError(null);
  }, []);

  const resetField = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!username || !email || !password || !passwordConfirmation) {
      return setError('All fields must be filled!');
    }

    if (!validateEmail(email)) {
      return setError('Email is not valid!');
    }

    if (password !== passwordConfirmation) {
      return setError('Password does not match!');
    }

    try {
      await signup({ username, email: email.toLowerCase(), password });
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
        <div className="card-header">Excellent choice!</div>
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
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
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
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={event => setPasswordConfirmation(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
