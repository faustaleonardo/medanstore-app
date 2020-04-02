import React from 'react';
import queryString from 'query-string';

const CategoryCheckbox = ({ categories }) => {
  let fullUrlAddress = window.location.href;
  let baseUrlAddress = fullUrlAddress.split('?')[0];

  const isChecked = categoryId => {
    return fullUrlAddress.includes(`categoryId=${categoryId}`) ? true : false;
  };

  const handleChange = event => {
    const value = event.target.value;
    const checked = event.target.checked;

    const parsed = queryString.parse(window.location.search);
    if (checked) {
      if (parsed.categoryId instanceof Array) {
        parsed.categoryId.push(value);
      } else {
        parsed.categoryId = [parsed.categoryId, value];
      }
    } else {
      if (parsed.categoryId instanceof Array) {
        parsed.categoryId = parsed.categoryId.filter(el => el !== value);
      } else {
        delete parsed.categoryId;
      }
    }

    const urlDestination = queryString.stringifyUrl({
      url: baseUrlAddress,
      query: parsed
    });

    window.location.href = urlDestination;
  };

  return categories.map(category => {
    return (
      <div className="form-check form-check-inline" key={category.id}>
        <input
          className="form-check-input"
          type="checkbox"
          id="category"
          value={category.id}
          defaultChecked={isChecked(category.id)}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="Category">
          {category.value}
        </label>
      </div>
    );
  });
};

export default CategoryCheckbox;
