import { useEffect, useState } from "react";

const useOrderDetailsProducts = (products) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_ORDER_DETAILS_PRODUCTS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productsData: products }), // use prop directly
        });

        const data = await res.json();
        setOrderData(data);
      } catch (err) {
        console.error("Error fetching product orderData:", err);
      } finally {
        setLoading(false);
      }
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
