import React from 'react';
import queryString from 'query-string';

const ConditionCheckbox = () => {
  //http://lorem.com?foo=bar
  let fullUrlAddress = window.location.href;

  //http://lorem.com
  let baseUrlAddress = fullUrlAddress.split('?')[0];

  const isChecked = condition => {
    return fullUrlAddress.includes(`condition=${condition}`) ? true : false;
  };

  const handleChange = event => {
    const value = event.target.value;
    const checked = event.target.checked;

    const parsed = queryString.parse(window.location.search);
    if (checked) {
      if (parsed.condition) {
        parsed.condition = [parsed.condition];
        parsed.condition.push(value);
      } else parsed.condition = value;
    } else {
      if (parsed.condition instanceof Array) {
        parsed.condition = parsed.condition.filter(el => el !== value);
      } else {
        delete parsed.condition;
      }
    }

    const urlDestination = queryString.stringifyUrl({
      url: baseUrlAddress,
      query: parsed
    });

    window.location.href = urlDestination;
  };

  return (
    <div>
      <div className="float-left">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="newCheckbox"
            value="New"
            defaultChecked={isChecked('New')}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="newCheckbox">
            New
          </label>
        </div>
      </div>
      <div className="float-left">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="usedCheckbox"
            value="Used"
            defaultChecked={isChecked('Used')}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="usedCheckbox">
            Used
          </label>
        </div>
      </div>
    </div>
  );
};

export default ConditionCheckbox;
