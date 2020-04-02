import React from 'react';
import queryString from 'query-string';

const SortDropdown = () => {
  const parsed = queryString.parse(window.location.search);

  const getUrlDestination = queryObj => {
    if (parsed.sort_by) delete parsed.sort_by;
    if (parsed.sort) delete parsed.sort;

    return `/items?${queryString.stringify({ ...parsed, ...queryObj })}`;
  };

  return (
    <div className="btn-group dropleft float-right">
      <button
        className="btn btn-light dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Sort
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a
          href={getUrlDestination({ sort_by: 'price', sort: 'asc' })}
          className="dropdown-item"
        >
          Sort by the lowest price
        </a>
        <a
          href={getUrlDestination({ sort_by: 'price', sort: 'desc' })}
          className="dropdown-item"
        >
          Sort by the highest price
        </a>
        <a
          href={getUrlDestination({ sort_by: 'name' })}
          className="dropdown-item"
        >
          Sort by the name
        </a>
        <a
          href={getUrlDestination({ sort_by: 'latest' })}
          className="dropdown-item"
        >
          Sort by latest
        </a>
      </div>
    </div>
  );
};

export default SortDropdown;
