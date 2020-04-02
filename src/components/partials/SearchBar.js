import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/authState';

const SearchBar = () => {
  const { auth } = useContext(AuthContext);
  if (auth === false || (auth && auth.roleId === 2)) {
    return (
      <form action="/items">
        <input
          className="form-control"
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    );
  }
  return null;
};

export default SearchBar;
