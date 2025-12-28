import Cookies from "js-cookie";

const getToken = () => Cookies.get("token");

// Get All Products
export const getAllProducts = async () => {
  const res = await fetch(`${process.env.REACT_APP_ALL_PRODUCTS_BACKEND_API_URL}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};
// Get All Medias
export const getAllMedias = async () => {
  const res = await fetch(`${process.env.REACT_APP_ALL_MEDIAS_BACKEND_API_URL}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};
// Get All Orders
export const getAllOrders = async () => {
  const res = await fetch(`${process.env.REACT_APP_ALL_ORDERS_BACKEND_API_URL}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};
// Upload Medias
export const uploadMedias = async (formData) => {
  const res = await fetch(`${process.env.REACT_APP_UPLOAD_MEDIAS_BACKEND_API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });
  return res.json();
}
// See Order Details
export const getOrderDetails = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_ORDERS_DETAILS_BACKEND_API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}
// Set Order Status
export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${process.env.REACT_APP_ORDER_DETAILS_UPDATED_BACKEND_API_URL}/${id}/${status}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  })
  return res.json();
}
// Get Products Data
export const getsProductData = async (products) => {
  const res = await fetch(`${process.env.REACT_APP_GET_PRODUCT_DATA_BACKEND_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ productsData: products })
  })
  return res.json();
}
// Get Cloudinary Detials
export const getCloudinaryDetials = async () => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_API_GET_CLOUDINARY_DETAILS_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return res.json();
}