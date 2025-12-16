import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
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

const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/all-orders")
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

  // const handleDelete = (id) => {
  //   fetch(`http://localhost:7000/delete-product/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data.message); // Success message
  //       // Fix here: setProducts is not defined, you used 'data' state
  //       setData(prev => prev.filter(product => product._id !== id)); // use setData, not setProducts
  //     })
  //     .catch(err => {
  //       console.error("Delete failed:", err);
  //     });
  // };


  return (
    <div className="container">
      {/* Head */}
      <div className="page-header">
        <h1>Orders</h1>
        <div className="search">
          <Search className="icon" />
          <input type="text" placeholder="Search for..." />
        </div>
        <button>Create Order</button>
      </div>

      <div className="collect">
        <div className="box">
          <div className="details">
            <div className="icon-box purple">
              <TotalUser className="icon" />
            </div>
            <div>
              <h4>Total Orders</h4>
              <p>250</p>
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
              <h4>New Users</h4>
              <p>15</p>
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
              <h4>Top Users</h4>
              <p>200</p>
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
              <h4>Other Users</h4>
              <p>35</p>
            </div>
          </div>
          <ThreeDots className="icon white icon-20 c-pointer" />
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table-container">
          <div className="table-head d-flex between j-center">
            <h4 className="white">All Orders</h4>
            <p><b>1-10</b> of 256</p>
          </div>
          <div className="table">
            {/* Table Head */}
            <div className="table-row table-head">
              <div className="table-cell checkbox">
                <input type="checkbox" className="table-checkbox" />
              </div>
              <div className="table-cell">Order</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Customer</div>
              {/* <div className="table-cell">Payment Method</div> */}
              <div className="table-cell">Total</div>
              <div className="table-cell">Items</div>
              <div className="table-cell">Status</div>
              <div className="table-cell"></div>
            </div>

            {/* Table Body */}
            {data.map((orders) => (
              <div className="table-row" key={orders._id}>
                <div className="table-cell checkbox">
                  <input type="checkbox" className="table-checkbox" />
                </div>
                <div className="table-cell">#{orders.orderid}</div>
                <div className="table-cell">
                  {orders.createdAt
                    ? `${orders.createdAt.month[1]} ${orders.createdAt.day[0]}, 20${orders.createdAt.year}, ${orders.createdAt.time[1]}`
                    : "N/A"}
                </div>
                <div className="table-cell">{orders.firstname} {orders.lastname}</div>
                {/* <div className="table-cell">{orders.paymentMethod}</div> */}
                <div className="table-cell">${orders.total}.00</div>
                <div className="table-cell">{orders.products.length} Items</div>
                <div className={`table-cell ${orders.status}`}><span className={`status-action ${orders.status}`}>{orders.status}</span></div>
                <div className="table-cell action">
                  <Link to={`/order-details/${orders.orderid}`}>
                    <Pencil className="icon icon-15 c-pointer" />
                  </Link>
                  <Link>
                    <Bin className="icon icon-15 c-pointer bin" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="table-foot d-flex between j-center">
          <p className="white"><b>1-10</b> of 256</p>
          <div className="d-flex j-center">
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

export default Orders;