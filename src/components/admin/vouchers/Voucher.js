/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { VoucherContext } from '../../../context/vouchers/voucherState';
import { AuthContext } from '../../../context/auth/authState';

import WarningModal from '../../partials/WarningModal';
import formatDate from '../../../utils/formatDate';
import Loader from '../../partials/Loader';

const Voucher = () => {
  const { vouchers, getVouchers, deleteVoucher, isLoading } = useContext(
    VoucherContext
  );
  const { auth } = useContext(AuthContext);

  const [id, setId] = useState(null);

  useEffect(() => {
    getVouchers();
  }, []);

  const renderContent = () => {
    return vouchers.map(voucher => {
      return (
        <tr key={voucher.id}>
          <td>{voucher.id}</td>
          <td>{voucher.code}</td>
          <td className="text-center">{voucher.discount}%</td>
          <td>{formatDate(voucher.expiredTime)}</td>
          <td className="text-center">
            <Link
              to={'/admin/vouchers/' + voucher.id + '/update'}
              className="btn btn-outline-success"
            >
              Update
            </Link>
          </td>
          <td className="text-center">
            <button
              className="btn btn-outline-danger"
              data-toggle="modal"
              data-target="#warningModal"
              onClick={() => {
                setId(voucher.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const render = () => {
    if (isLoading) return null;

    if (!vouchers.length) {
      return (
        <div className="center-vh">
          <h3>No record yet :(</h3>
        </div>
      );
    }

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="text-uppercase">
            <th>Id</th>
            <th>Code</th>
            <th className="text-center">Discount</th>
            <th>Valid Until</th>
            <th className="text-center">Update</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
    );
  };

  if (isLoading) return <Loader />;
  if (auth === false) return <Redirect to="/login" />;

  if (!vouchers.length) {
    return (
      <div className="center-vh">
        <h3>No record yet :(</h3>
      </div>
    );
  }

  return (
    <Fragment>
      <WarningModal title="Delete a Voucher" id={id} action={deleteVoucher} />

      <div className="clearfix mt-5 mb-3">
        <div className="float-left">
          <h4>Voucher</h4>
        </div>
        <div className="float-right">
          <Link to="/admin/vouchers/create" className="btn btn-success">
            New Voucher
          </Link>
        </div>
      </div>
      {render()}
    </Fragment>
  );
};

export default Voucher;
