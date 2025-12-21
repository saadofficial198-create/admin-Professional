import "../styles/single-order.css"; // Single Order Details CSS
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrderDetailsProducts from "../components/actions/orderdetailsproducts";
import { getResizedCloudinaryUrl } from "../utils/cloudinary"
import { Search, ThreeDots, Processing, DoubleCheck } from "../assets/icons";
import { initDropdowns } from "../utils/dropdown";
import { getOrderDetails, updateOrderStatus } from "../services/api.js";

export default function OrderDetails() {
  let [isWorking, setIsWorking] = useState(false);
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const statusList = [
    "pending", "processing", "on-hold",
    "partially-shipped", "shipped", "delivered",
    "returned", "refunded", "failed", "cancelled",
  ];
  const currentStatus = orderDetails?.status;
  useEffect(() => {
    getOrderDetails(id)
      .then(data => setOrderDetails(data.order))
      .catch((err) => console.error("Error fetching order details:", err))
  }, [id]);
  useEffect(() => {
    initDropdowns();
  }, [orderDetails]);

  // ✅ Use the hook here
  const { orderData: productData, loading } = useOrderDetailsProducts(orderDetails?.products);

  const formatChangedAt = (index) => {
    const changedAt = orderDetails?.statusHistory?.[index]?.changedAt;
    if (!changedAt) return "———";
    return `${changedAt.day[0]} ${changedAt.month[1]} 20${changedAt.year}`;
  };
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusAction = (e) => {
    const status = e.currentTarget.getAttribute("data-status");
    setSelectedStatus(status);
    setIsWorking(true);
    updateOrderStatus(id, status)
      .then(data => {
        setOrderDetails(prevDetails => ({
          ...prevDetails,
          status: status,
          statusHistory: data.data,
        }));
        setIsWorking(false);
      });
  };

  return (
    <div className="container order-details">
      {/* Head */}
      <div className="page-header">
        <h1>Orders</h1>
        <div className="search">
          <Search className="icon" />
          <input type="text" placeholder="Search for..." />
        </div>
        <button>Create Order</button>
      </div>
      <div className="main">
        <div className="d-flex between w-100">
          <div className="d-flex j-center gap-30">
            <h4 className="head-cell white">Order Number #{orderDetails?.orderid}</h4>
            <p><strong className="cell white pr-15">Order Created </strong>
              {orderDetails?.createdAt.day[1]}, {orderDetails?.createdAt.month[1]}, {orderDetails?.createdAt.day[0]}, 20{orderDetails?.createdAt.year} {orderDetails?.createdAt.time[1]}</p>
          </div>
          <div className="d-flex j-center gap-10">

            {!isWorking ? <DoubleCheck className="bg-icon done" /> : <Processing className="bg-icon processing" />}
            <div className="p-relative dropdown d-flex">
              <ThreeDots className="bg-icon d-toggle dropdown-btn " />
              <ul className="p-absolute marker-none dropdown-menu">
                {statusList.map((status, index) => {
                  const changedAt = orderDetails?.statusHistory?.[index]?.changedAt ?? null;
                  const isActive = currentStatus === status;
                  const isDone = changedAt !== null && !isActive;

                  let classNames = "d-item";
                  if (isActive) classNames += " active";
                  if (isDone) classNames += " done";

                  return (
                    <li
                      key={status}
                      className={classNames}
                      data-status={status}
                      onClick={!isActive && !isDone ? statusAction : undefined}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                    </li>
                  );
                })}

              </ul>

            </div>
          </div>
        </div>
        <div className="order-info">
          <div className="left">

            <div className="customer-info">
              <div>
                <h3 className="head-cell white">Customer Details</h3>
              </div>
              <p><strong>Name</strong> {orderDetails?.firstname} {orderDetails?.lastname}</p>
              <p><strong>Email</strong> <a href={`mailto:${orderDetails?.email}`}>{orderDetails?.email}</a></p>
              <p><strong>Phone</strong> <a href={`tel:${orderDetails?.phone}`}>{orderDetails?.phone}</a></p>
            </div>
            <div className="delivery-address">
              <div>
                <h3 className="head-cell white">Delivery Address</h3>
              </div>
              <p><strong>Address</strong> {orderDetails?.address}</p>
              <p><strong>Phone</strong> <a href={`tel:${orderDetails?.phone}`}>{orderDetails?.phone}</a></p>
              <p><strong>PostCode</strong> 1234</p>
            </div>
            <div className="order-details-box">
              {loading ? (
                <p>Loading products...</p>
              ) : (
                <div className="cart-container">
                  <div className="cart-header cart-grid" role="row">
                    <div className="head-cell white">Items</div>
                    <div className="head-cell white">Qty</div>
                    <div className="head-cell white">Price</div>
                    <div className="head-cell white">Total</div>
                  </div>
                  <div className="cart-body">
                    {Array.isArray(productData) && productData.map((item, index) => (
                      <div className="cart-row cart-grid" key={index}>
                        <div className="item">
                          <div className="image">
                            <img
                              src={getResizedCloudinaryUrl(item.image, 90, 80)}
                              alt={item.name || "product"}
                            />
                          </div>
                          <div className="details">
                            <h2 className="head-cell">{item.name}</h2>
                            {item.variantName && <span className="variant-cell">Variant: {item.variantName}</span>}
                          </div>
                        </div>

                        <div className="qty">{item.qty} Item</div>
                        <div className="price">${Number(item.price).toFixed(2)}</div>
                        <div className="price">${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="right">
            <div className="order-history">
              <h3 className="head-cell white">Order History</h3>
              <div className="order-history-details">
                <div className={`d-flex flex-column gap-10 p-relative status-${orderDetails?.status}`}>
                  <div>
                    <p className="status">Pending</p>
                    <p className="status-date">{formatChangedAt(0)}</p>
                  </div>
                  <div>
                    <p className="status">Processing</p>
                    <p className="status-date">{formatChangedAt(1)}</p>
                  </div>
                  <div>
                    <p className="status">On Hold</p>
                    <p className="status-date">{formatChangedAt(2)}</p>
                  </div>
                  <div>
                    <p className="status">Partially Shipped</p>
                    <p className="status-date">{formatChangedAt(3)}</p>
                  </div>
                  <div>
                    <p className="status">Shipped</p>
                    <p className="status-date">{formatChangedAt(4)}</p>
                  </div>
                  <div>
                    <p className="status">Delivered</p>
                    <p className="status-date">{formatChangedAt(5)}</p>
                  </div>
                  <div>
                    <p className="status">Returned</p>
                    <p className="status-date">{formatChangedAt(6)}</p>
                  </div>
                  <div>
                    <p className="status">Refunded</p>
                    <p className="status-date">{formatChangedAt(7)}</p>
                  </div>
                  <div>
                    <p className="status">Failed</p>
                    <p className="status-date">{formatChangedAt(8)}</p>
                  </div>
                  <div>
                    <p className="status">Cancelled</p>
                    <p className="status-date">{formatChangedAt(9)}</p>
                  </div>
                </div>


              </div>
            </div>
            <div className="payment-summary">
              <h3 className="head-cell white">Payment Summary</h3>
              <p><strong>Total Amount:</strong> ${orderDetails?.total}</p>
              <p><strong>Payment Method:</strong> {orderDetails?.paymentMethod}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
