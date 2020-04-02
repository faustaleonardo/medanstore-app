import React, { useContext } from 'react';
import $ from 'jquery';
import { useHistory } from 'react-router-dom';

import { CartContext } from '../../context/carts/cartState';

import formatCurrency from '../../utils/formatCurrency';

const CartModal = () => {
  const { carts, countTotalPrice, updateCart, deleteCart } = useContext(
    CartContext
  );
  const history = useHistory();

  const handleDeleteCart = id => deleteCart(id);

  const handleUpdateCart = (id, operator) => {
    const cart = carts.find(cart => cart.id === id);
    if (operator === 'subtract' && cart.quantity <= 1) return;

    return updateCart({
      id,
      operator
    });
  };

  const handleCheckout = () => {
    $('#cartModal').modal('toggle');
    history.push('/checkout');
  };

  const renderContent = () => {
    return carts.map(cart => {
      return (
        <div className="row mb-4" key={cart.id}>
          <div className="col-md-2">
            <img
              src={cart.picturePath}
              className="d-block w-100"
              alt={cart.name}
            />
          </div>
          <div className="col-md-10">
            <div className="clearfix">
              <div className="float-left">
                <p>{cart.name}</p>
              </div>
              <div className="float-right">
                <div
                  className="text-danger btn-pointer"
                  onClick={() => handleDeleteCart(cart.id)}
                >
                  <i className="fas fa-trash"></i>
                </div>
              </div>
            </div>
            <div className="clearfix">
              <div className="float-left">
                <span className="font-weight-bold">Quantity</span>
              </div>
              <div className="float-right">
                <span className="font-weight-bold">Price</span>
              </div>
            </div>
            <div className="clearfix">
              <div className="float-left">
                <div
                  className="btn-pointer text-danger"
                  onClick={() => handleUpdateCart(cart.id, 'subtract')}
                >
                  <i className="fas fa-minus"></i>
                </div>
                <input
                  type="text"
                  className="input-quantity"
                  disabled
                  value={cart.quantity}
                />
                <div
                  className="btn-pointer text-success"
                  onClick={() => handleUpdateCart(cart.id, 'add')}
                >
                  <i className="fas fa-plus"></i>
                </div>
              </div>
              <div className="float-right">
                <span className="text-success font-weight-bold">
                  {formatCurrency(cart.totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderModal = body => {
    return (
      <div
        className="modal fade"
        id="cartModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="cartTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title" id="cartTitle">
                You have {carts.length} item in your cart
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
            {body}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {carts.length ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!carts.length) {
    return renderModal(<div className="modal-body">Empty :(</div>);
  }

  const cartBody = (
    <div className="modal-body">
      <div className="container-fluid">{renderContent()}</div>
      <div className="clearfix">
        <div className="border-top mb-3"></div>
        <h4 className="float-left text-uppercase">Total</h4>
        <h5 className="float-right text-success font-weight-bold">
          {formatCurrency(countTotalPrice())}
        </h5>
      </div>
    </div>
  );
  return renderModal(cartBody);
};

export default CartModal;
