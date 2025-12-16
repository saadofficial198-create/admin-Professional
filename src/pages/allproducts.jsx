import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { getResizedCloudinaryUrl } from "../utils/cloudinary";
import {
  Search,
  User,
  ThreeDots,
  TotalUser,
  Heart,
  Message,
  Bin,
  Pencil,
  ArrowLeft,
  ArrowRight,
  map,
  Check2
} from "../assets/icons";

const AllProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/all-products`)
      .then(res => res.json())
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        console.log("Fetch completed");
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:7000/delete-product/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message); // Success message
        // Fix here: setProducts is not defined, you used 'data' state
        setData(prev => prev.filter(product => product._id !== id)); // use setData, not setProducts
      })
      .catch(err => {
        console.error("Delete failed:", err);
      });
  };


  return (
    <div className="container">
      {/* Head */}
      <div className="page-header">
        <h1>Products</h1>
        <div className="search">
          <Search className="icon" />
          <input type="text" placeholder="Search for..." />
        </div>
        <button>Create Product</button>
      </div>

      {/* 4 Static Boxes */}
      <div className="collect">
        <div className="box">
          <div className="details">
            <div className="icon-box purple">
              <TotalUser className="icon" />
            </div>
            <div>
              <h4>Total Products</h4>
              <p>120</p>
            </div>
          </div>
          <ThreeDots className="icon white icon-20 c-pointer" />
        </div>
        <div className="box">
          <div className="details">
            <div className="icon-box yellow">
              <User className="icon" />
            </div>
            <div>
              <h4>New Products</h4>
              <p>10</p>
            </div>
          </div>
          <ThreeDots className="icon white icon-20 c-pointer" />
        </div>
        <div className="box">
          <div className="details">
            <div className="icon-box green">
              <Heart className="icon" />
            </div>
            <div>
              <h4>Top Products</h4>
              <p>25</p>
            </div>
          </div>
          <ThreeDots className="icon white icon-20 c-pointer" />
        </div>
        <div className="box">
          <div className="details">
            <div className="icon-box blue">
              <Message className="icon" />
            </div>
            <div>
              <h4>Other Products</h4>
              <p>5</p>
            </div>
          </div>
          <ThreeDots className="icon white icon-20 c-pointer" />
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-container">
          <div className="table-head d-flex between j-center">
            <h4 className="white">All Products</h4>
            <p>
              <b>1-10</b> of 120
            </p>
          </div>

          <div className="table products">
            {/* Table Head */}
            <div className="table-row table-head">
              <div className="table-cell checkbox">
                <input type="checkbox" className="table-checkbox" />
              </div>
              <div className="table-cell">Name</div>
              <div className="table-cell">Image</div>
              <div className="table-cell">Price</div>
              <div className="table-cell">Created At</div>
              <div className="table-cell">Price (dup)</div>
              <div className="table-cell">Status</div>
              <div className="table-cell"></div>
            </div>

            {/* Table Body */}
            {data.map((product) => (
              <div className="table-row" key={product._id}>
                <div className="table-cell checkbox">
                  <input type="checkbox" className="table-checkbox" />
                </div>
                <div className="table-cell product-image">
                  <img
                    src={getResizedCloudinaryUrl(
                      product.image ? product.image : product.variants[0].image,
                      90,
                      90
                    )}
                    alt={product.name}
                    className="table-img"
                    />
                    {product.name}
                </div>
                {/* <div className="table-cell">
                  <img
                    src={getResizedCloudinaryUrl(
                      product.image ? product.image : product.variants[0].image,
                      90,
                      80
                    )}
                    alt={product.name}
                    className="table-img"
                  />

                </div> */}
                <div className="table-cell">
                  ${product.price ? product.price : product.variants[0].price}
                </div>
                <div className="table-cell">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="table-cell">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="table-cell">
                  ${product.price ? product.price : product.variants[0].price}
                </div>
                <div className="table-cell">Active</div>
                <div className="table-cell action">
                  <Link to={`/edit-product/${product._id}`}>
                    <Pencil className="icon icon-15 c-pointer" />
                  </Link>
                  <Link to={`/edit-product/${product._id}`}>
                    <Bin className="icon icon-15 c-pointer bin" />
                  </Link>
                  {/* <button
                    className="bin-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Bin className="icon icon-15 c-pointer bin" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Foot */}
        <div className="table-foot d-flex between j-center">
          <p className="white">
            <b>1-10</b> of 120
          </p>
          <div className="d-flex j-center gap-10">
            <button className="pagination">
              <ArrowLeft className="icon icon-14" />
            </button>
            <button className="pagination">
              <ArrowRight className="icon icon-14" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default AllProducts;
