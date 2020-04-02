import React from 'react';

const WarningAlert = ({ content }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {content}
    </div>
  );
};

export default WarningAlert;
