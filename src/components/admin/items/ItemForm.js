import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

import { ItemContext } from '../../../context/items/itemState';
import renderWarningAlert from '../../../utils/renderWarningAlert';
import WarningModal from '../../partials/WarningModal';

const ItemForm = ({ title, buttonName }) => {
  /** -----------start: set local state--------- */
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [condition, setCondition] = useState('New');
  const [cpu, setCpu] = useState('');
  const [display, setDisplay] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [battery, setBattery] = useState('');
  const [rearCamera, setRearCamera] = useState('');
  const [frontCamera, setFrontCamera] = useState('');
  const [os, setOs] = useState('');
  const [network, setNetwork] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [pictureId, setPictureId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [pictures, setPictures] = useState([]);
  /** -----------end: set local state--------- */

  const { addItem, updateItem, setError, error } = useContext(ItemContext);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setError(null);

    const fetchCategories = async () => {
      const response = await axiosInstance.get('/api/v1/categories');
      const result = response.data.data.data;
      setCategories(result);
    };
    fetchCategories();

    /** -----------start: fetching data for updating item--------- */
    const fetchItem = async () => {
      const response = await axiosInstance.get(
        `/api/v1/items/${id}/category&pictures`
      );
      const item = response.data.data.data;

      setName(item.name);
      setPrice(item.price);
      setDescription(item.description);
      setStock(item.stock);
      setCondition(item.condition);
      setCpu(item.cpu);
      setDisplay(item.display);
      setRam(item.ram);
      setStorage(item.storage);
      setBattery(item.battery);
      setRearCamera(item.rearCamera);
      setFrontCamera(item.frontCamera);
      setOs(item.os);
      setNetwork(item.network);
      setCategoryId(item.categoryId);
      setPictures(item.pictures);
    };
    if (id) fetchItem();
  }, []);
  /** -----------end: fetching data for updating item--------- */

  const deletePicture = async id => {
    await axiosInstance.delete(`/api/v1/pictures/${id}`);
    window.location.reload();
  };

  /** -----------start: for rendering separate component--------- */
  const renderSelect = () => {
    return categories.map(category => {
      return (
        <Fragment key={category.id}>
          <option value={category.id}>{category.value}</option>
        </Fragment>
      );
    });
  };

  const renderPictures = () => {
    return pictures.map(picture => {
      return (
        <div className="border phone-picture-container" key={picture.id}>
          <img src={picture.path} className="phone-picture" />
          <button
            type="button"
            className="btn btn-outline-danger btn-sm btn-delete-phone-picture"
            data-toggle="modal"
            data-target="#warningModal"
            onClick={() => setPictureId(picture.id)}
          >
            Delete <i className="fa fa-trash"></i>
          </button>
        </div>
      );
    });
  };
  /** -----------end: for rendering separate component--------- */

  const uploadFileToServer = async id => {
    const formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append('images', images[key]);
    }
    await axiosInstance.post(`/api/v1/pictures/items/${id}`, formData);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    /** -----------start: validation--------- */
    if (
      !name ||
      !price ||
      !description ||
      !stock ||
      !cpu ||
      !display ||
      !ram ||
      !storage ||
      !battery ||
      !rearCamera ||
      !frontCamera ||
      !os ||
      !network
    ) {
      window.scrollTo(0, 0);
      return setError('All fields must be filled!');
    }
    if (stock <= 0) return setError('Stock must be greater than zero');
    if (price <= 0) return setError('Price must be greater than zero');
    /** -----------end: validation--------- */

    try {
      const data = {
        name,
        price,
        description,
        stock,
        condition,
        cpu,
        storage,
        display,
        ram,
        battery,
        rearCamera,
        frontCamera,
        os,
        network,
        categoryId
      };

      /** -----------start: run axios and set global state--------- */
      let item;
      if (!id) {
        const response = await axiosInstance.post('/api/v1/items', data);
        item = response.data.data.data;
        addItem(data);
      } else {
        const response = await axiosInstance.patch(`/api/v1/items/${id}`, data);
        item = response.data.data.data;
        updateItem(data);
      }
      /** -----------end: run axios and set global state--------- */

      // upload to server
      await uploadFileToServer(item.id);
      history.push('/admin/items');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Fragment>
      <WarningModal
        title="Delete a Picture"
        id={pictureId}
        action={deletePicture}
      />

      <div className="row mt-5">
        <div className="col-sm-8 offset-sm-2">
          {renderWarningAlert(error)}

          <div className="card">
            <div className="card-header">{title}</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={event => setName(event.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={price}
                      onChange={event => setPrice(event.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="images">Pictures</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="images"
                    name="images"
                    onChange={event => setImages(event.target.files)}
                    multiple
                  />
                </div>
                <div>{renderPictures()}</div>
                <div className="form-group">
                  <label htmlFor="Description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    rows="5"
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="stock">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      value={stock}
                      onChange={event => setStock(event.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="condition">Condition</label>
                    <select
                      className="form-control"
                      id="condition"
                      value={condition}
                      onChange={event => setCondition(event.target.value)}
                    >
                      <option>New</option>
                      <option>Used</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="cpu">CPU</label>
                    <textarea
                      className="form-control"
                      id="cpu"
                      rows="2"
                      value={cpu}
                      onChange={event => setCpu(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="display">Display</label>
                    <textarea
                      className="form-control"
                      id="display"
                      rows="2"
                      value={display}
                      onChange={event => setDisplay(event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="ram">RAM</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ram"
                      value={ram}
                      onChange={event => setRam(event.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="storage">Storage</label>
                    <input
                      type="text"
                      className="form-control"
                      id="storage"
                      value={storage}
                      onChange={event => setStorage(event.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="battery">Battery</label>
                  <input
                    type="text"
                    className="form-control"
                    id="battery"
                    value={battery}
                    onChange={event => setBattery(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rearCamera">Rear Camera</label>
                  <textarea
                    className="form-control"
                    id="rearCamera"
                    rows="2"
                    value={rearCamera}
                    onChange={event => setRearCamera(event.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="frontCamera">Front Camera</label>
                  <input
                    type="text"
                    className="form-control"
                    id="frontCamera"
                    value={frontCamera}
                    onChange={event => setFrontCamera(event.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="os">OS</label>
                    <input
                      type="text"
                      className="form-control"
                      id="os"
                      value={os}
                      onChange={event => setOs(event.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="network">Network</label>
                    <input
                      type="text"
                      className="form-control"
                      id="network"
                      value={network}
                      onChange={event => setNetwork(event.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    value={categoryId}
                    onChange={event => setCategoryId(event.target.value)}
                  >
                    {renderSelect()}
                  </select>
                </div>
                <Link to="/admin/items" className="btn btn-secondary">
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
    </Fragment>
  );
};

export default ItemForm;
