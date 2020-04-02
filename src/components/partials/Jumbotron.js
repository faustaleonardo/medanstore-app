import React from 'react';
import { Link } from 'react-router-dom';

const Jumbotron = () => {
  return (
    <div className="jumbotron center-vh">
      <h1 className="display-4">Welcome</h1>
      <p className="lead">
        You have come to the right place. This is where you will find the
        cheapest, and yet with the highest quality phones ever!
      </p>
      <hr className="my-4" />
      <p></p>
      <Link to="/items" className="btn btn-success btn-lg" role="button">
        Find more
      </Link>
    </div>
  );
};

export default Jumbotron;
