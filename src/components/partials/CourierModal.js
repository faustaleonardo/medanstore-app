import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/carts/cartState';
import axiosInstance from '../../utils/axiosInstance';
import $ from 'jquery';

import formatCurrency from '../../utils/formatCurrency';

const CourierModal = ({ city, quantity }) => {
  const { setCourier, error, setError } = useContext(CartContext);
  const [couriers, setCouriers] = useState([]);

  const handleChooseCourier = courier => {
    setCourier(courier);
    $('#courierModal').modal('toggle');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosInstance.get(
          `/api/v1/raja-ongkir/${city.value}/costs?quantity=${quantity}`
        );
        const results = response.data.data.data;
        setCouriers(results);

        if (error) setError(null);
      } catch (err) {
        setError(err.response.data);
      }
    };
    if (city) fetchData();
  }, [city]);

  const renderContent = () => {
    if (!couriers) return null;

    return couriers.map((courier, index) => {
      return (
        <tr key={index}>
          <th scope="row">{courier.name}</th>
          <td>
            200g x {quantity} items = {200 * quantity}g
          </td>
          <td>{formatCurrency(courier.cost[0].value)}</td>
          <td className="text-center text-lowercase">{courier.cost[0].etd}</td>
          <td className="text-center">
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => handleChooseCourier(courier)}
            >
              Choose
            </button>
          </td>
        </tr>
      );
    });
  };

  if (!city) return null;

  return (
    <div
      className="modal fade"
      id="courierModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="courierTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title" id="cartTitle">
              Choose a courier
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="text-uppercase">
                    Service
                  </th>
                  <th scope="col" className="text-uppercase">
                    Weight
                  </th>
                  <th scope="col" className="text-uppercase">
                    Cost
                  </th>
                  <th scope="col" className="text-uppercase text-center">
                    Est. Days
                  </th>
                  <th scope="col" className="text-uppercase text-center">
                    Choose
                  </th>
                </tr>
              </thead>
              <tbody>{renderContent()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierModal;
