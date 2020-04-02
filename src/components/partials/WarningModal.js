import React from 'react';

const WarningModal = ({ title, id, action }) => {
  const handleSubmit = async event => {
    event.preventDefault();
    await action(id);
    window.location.reload();
  };

  return (
    <div
      className="modal fade"
      id="warningModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="warningTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title" id="warningTitle">
              {title}
            </p>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to do this?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <form onSubmit={handleSubmit}>
              <button type="submit" className="btn btn-danger">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
