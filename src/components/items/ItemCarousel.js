import React from 'react';

const ItemCarousel = ({ pictures }) => {
  const renderContent = () => {
    return pictures.map((picture, index) => {
      return (
        <div
          className={'carousel-item ' + (index === 0 ? '' : 'active')}
          data-interval="10000"
          key={picture.id}
        >
          <img
            src={picture.path}
            className="d-block w-100 phone-img"
            alt="phone pictures"
          />
        </div>
      );
    });
  };

  return (
    <div
      id="carouselPhone"
      className="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <div className="carousel-inner">{renderContent()}</div>
      <a
        className="carousel-control-prev"
        href="#carouselPhone"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselPhone"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default ItemCarousel;
