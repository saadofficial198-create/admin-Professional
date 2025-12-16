import { useState } from "react";
import { Search } from "../assets/icons";
import "../styles/globals.css";

const Product = () => {

  return (
    <div className="container">
      {/* Head */}
      <div className="page-header">
        <h1>Product</h1>
        <div className="search">
          <Search className="icon" />
          <input type="text" placeholder="Search for..." />
        </div>
        <button>Create Product</button>
      </div>
      <div className="d-flex flex-column product">
        <h3 className="white">Create Product</h3>
        <p>Desing and lanuch your products with ease efficiency</p>
        <div className="d-flex gap-20 add-new-product">
          <div className="left">
            <div className="field">
              <label htmlFor="">Product Name</label>
              <input type="text" placeholder="Product Name..." name="productname" />
            </div>
            <div className="field">
              <label htmlFor="">Category</label>
              <input type="text" name="category" />
            </div>
            <div className="field">
              <label htmlFor="">Description</label>
              <input type="text" name="description" />
            </div>
            <div className="field">
              <label htmlFor="">Pricing</label>
              <input type="text" name="pricing" />
            </div>
            <div className="field">
              <label htmlFor="">Max Discount</label>
              <input type="text" name="maxdiscount" />
            </div>
          </div>
          <div className="right">
            <div className="upload-file"></div>

            <div className="field">
              <label htmlFor="">Product Photos</label>
              <input type="file" name="productphotos" multiple />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Product;
