import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth/authState';
import formatDate from '../../utils/formatDate';
import formatCurrency from '../../utils/formatCurrency';

import WarningModal from '../partials/WarningModal';

const Order = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [id, setId] = useState(null);

  const { auth } = useContext(AuthContext);

  const cancelPayment = async orderId => {
    await axios.patch(`/api/v1/payments/${orderId}`, { active: false });
  };

  const handleStripeToken = async (orderId, token) => {
    await axios.patch(`api/v1/payments/${orderId}/stripe`, {
      token: token.id
    });
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/payments?page=${page}`);
        const payments = response.data.data.data;
        for (const payment of payments) {
          const response = await axios.get(
            `api/v1/orders/${payment.orderId}/items`
          );
          payment.orders = response.data.data.data;
        }

        setPayments(payments);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    const hasNextPage = async () => {
      const response = await axios.get(`/api/v1/payments?page=${page + 1}`);
      const result = response.data.data.data;
      if (result.length === 0) setNextPage(false);
      else setNextPage(true);
    };

    fetchData();
    hasNextPage();
  }, [page]);

  let subTotal;
  const renderSubContent = payment => {
    subTotal = 0;
    const orderContent = payment.orders.map(order => {
      subTotal += order.totalPrice * 1;
      return (
        <tr key={order.id}>
          <td>{order.item.name}</td>
          <td className="text-center">{order.quantity}</td>
          <td>{formatCurrency(order.totalPrice)}</td>
        </tr>
      );
    });

    return orderContent;
  };

  const renderContent = () => {
    return payments.map(payment => {
      return (
        <div className="order-section" key={payment.id}>
          {payment.active ? (
            <div className="alert alert-info">
              Please pay your order before {formatDate(payment.expiredTime)}
            </div>
          ) : null}
          <div className="clearfix">
            <div className="float-left">
              <h4>
                Status:
                {!payment.active && payment.statusPayment ? (
                  <span className="text-success"> Paid</span>
                ) : null}
                {payment.active && !payment.statusPayment ? (
                  <span className="text-secondary"> Waiting for Payment</span>
                ) : null}
                {!payment.active && !payment.statusPayment ? (
                  <span className="text-danger"> Cancelled</span>
                ) : null}
              </h4>
            </div>

            {payment.active ? (
              <div className="float-right">
                <StripeCheckout
                  name="MEDANSTORE Co."
                  description="Get your dream phones now :)"
                  amount={payment.finalPrice * 100}
                  currency="IDR"
                  stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
                  email={auth.email}
                  token={token => handleStripeToken(payment.orderId, token)}
                >
                  <button type="button" className="btn btn-success">
                    Pay now
                  </button>
                </StripeCheckout>

                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  data-toggle="modal"
                  data-target="#warningModal"
                  onClick={() => setId(payment.orderId)}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>

          <p className="text-secondary mb-0">
            Ordered on {formatDate(payment.createdAt)}
            {payment.courier}
          </p>
          <div className="clearfix mb-1">
            <div className="float-left">
              <p className="text-secondary">
                Sent to {payment.deliveryAddress} by {payment.courier}
              </p>
            </div>
            <div className="float-right">
              <p className="text-secondary">Order ID #${payment.orderId}</p>
            </div>
          </div>
          <table className="table mb-5">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col" className="text-center">
                  Quantity
                </th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {renderSubContent(payment)}
              <tr>
                <th>Subtotal</th>
                <td></td>
                <th>{formatCurrency(subTotal)}</th>
              </tr>
              {payment.discount !== 0 ? (
                <tr className="text-danger">
                  <th>Voucher Code Discount {payment.discount}%</th>
                  <td></td>
                  <th>
                    - {formatCurrency((subTotal * payment.discount * 1) / 100)}
                  </th>
                </tr>
              ) : null}
              <tr className="text-success">
                <th>Delivery Cost</th>
                <td></td>
                <th>+ {formatCurrency(payment.deliveryCost)}</th>
              </tr>
              <tr className="text-success">
                <th>Total</th>
                <td></td>
                <th>{formatCurrency(payment.finalPrice)}</th>
              </tr>
            </tbody>
          </table>
          <div className="border-bottom mb-5 border-success"></div>
        </div>
      );
    });
  };

  const renderPaginate = () => {
    if (page === 1 && nextPage === false) return null;

    return (
      <nav aria-label="Page navigation" className="item-pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
          </li>
          <li className={`page-item ${nextPage === false ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  if (auth === false) return <Redirect to="/login" />;

  if (!payments.length || nextPage === null) return null;

  return (
    <Fragment>
      <WarningModal title="Cancel the Order" id={id} action={cancelPayment} />

      <div className="mt-5">
        <h1 className="mb-5">My Orders</h1>
        <div className="orders-contaienr">{renderContent()}</div>
      </div>
      {renderPaginate()}
    </Fragment>
  );
};

export default Order;
