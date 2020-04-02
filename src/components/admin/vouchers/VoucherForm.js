/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

import { VoucherContext } from '../../../context/vouchers/voucherState';
import { AuthContext } from '../../../context/auth/authState';
import renderWarningAlert from '../../../utils/renderWarningAlert';

const VoucherForm = ({ title, buttonName }) => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const { addVoucher, updateVoucher, setError, error } = useContext(
    VoucherContext
  );
  const { auth } = useContext(AuthContext);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setError(null);

    // update voucher
    const fetchVoucher = async () => {
      const response = await axiosInstance.get(`/api/v1/vouchers/${id}`);
      const voucher = response.data.data.data;

      setCode(voucher.code);
      setDiscount(voucher.discount);
    };
    if (id) fetchVoucher();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    if (discount <= 0) return setError('Discount must be greater than zero');
    if (discount > 100)
      return setError('Discount must not be greater than 100');

    if (!code || !discount) return setError('Code and discount must be filled');

    try {
      if (!id) await addVoucher({ code, discount });
      else await updateVoucher(id, { code, discount });
      history.push('/admin/vouchers');
    } catch (err) {
      setError(err.response.data);
    }
  };

  if (auth === false) return <Redirect to="/login" />;

  return (
    <div className="row mt-5">
      <div className="col-sm-8 offset-sm-2">
        {renderWarningAlert(error)}

        <div className="card">
          <div className="card-header">{title}</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="code">Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  value={code}
                  onChange={event => setCode(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="discount">Discount (%)</label>
                <input
                  type="number"
                  className="form-control"
                  id="discount"
                  value={discount}
                  onChange={event => setDiscount(event.target.value)}
                />
              </div>
              <Link to="/admin/vouchers" className="btn btn-secondary">
                Back
              </Link>
              <button type="submit" className="btn btn-success ml-2">
                {buttonName}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherForm;
