import { useEffect, useState } from "react";
import { getsProductData } from "../../services/api.js";

const useOrderDetailsProducts = (products) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = () => {
      getsProductData(products)
        .then((data) => setOrderData(data))
        .catch((err) => console.error("Error fetching order products data:", err))
        .finally(() => setLoading(false));
    };

    if (products && products.length > 0) {
      getProducts();
    } else {
      setLoading(false);
    }
  }, [products]); // dependency added

  return { orderData, loading };
};

export default useOrderDetailsProducts;
