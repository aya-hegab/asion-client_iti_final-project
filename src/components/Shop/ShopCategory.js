import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../apis/config";
const ShopCategory = ({ minPrice, maxPrice, handlePriceChange, maxPriceFromAPI}) => {



  return (
    <div className="sidebar__filter">
      <div className="section-title">
        <h4>Shop by price</h4>
      </div>
      <div className="filter-range-wrap">
        <input
          type="range"
          className="custom-range"
          min="0"
          max={maxPriceFromAPI}
          step="1"
          value={minPrice}
          onChange={handlePriceChange}
          name="minPrice"
        />
        <input
          type="range"
          className="custom-range"
          min="0"
          max={maxPriceFromAPI}
          step="1"
          value={maxPrice}
          onChange={handlePriceChange}
          name="maxPrice"
        />
        <div className="range-slider">
          <div className="price-input">
            <p>Price:</p>
            <input
              type="text"
              id="minamount"
              value={minPrice}
              onChange={handlePriceChange}
              name="minPrice"
            />
            <input
              type="text"
              id="maxamount"
              value={maxPrice}
              onChange={handlePriceChange}
              name="maxPrice"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
