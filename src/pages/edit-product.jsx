import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageGallery from "../components/Global/gallery"; // Adjust path if needed

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const [overlay, setOverlay] = useState({
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "#00000061",
    display: "none",
  });

  const [images, setImages] = useState([]); // ✅ Gallery images

  // Fetch product data
  useEffect(() => {
    fetch(`http://localhost:7000/single-product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  // Fetch gallery images
  useEffect(() => {
    fetch("http://localhost:7000/media")
      .then(res => res.json())
      .then(data => setImages(data || []))
      .catch(err => console.error("Gallery fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setProduct(prev => ({ ...prev, price: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:7000/update-product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        navigate("/all-products");
      })
      .catch(err => console.error(err));
  };

  const handleImageSelect = (imgUrl) => {
    setProduct(prev => ({ ...prev, image: imgUrl }));
    setOverlay(prev => ({ ...prev, display: "none" }));
  };

  // Styles
  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Edit Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {product.image && (
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <img
              src={product.image}
              alt="Selected"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
            />
          </div>
        )}

        <button
          type="button"
          style={{ ...buttonStyle, marginBottom: "10px" }}
          onClick={() => setOverlay(prev => ({ ...prev, display: "block" }))}
        >
          Select Image
        </button>

        <textarea
          name="description"
          placeholder="Product Description"
          rows="4"
          value={product.description}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handlePriceChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          Update Product
        </button>
      </form>

      {overlay.display === "block" && (
        <div style={overlay}>
          <ImageGallery
            images={images}
            onSelect={handleImageSelect}
            onClose={() => setOverlay(prev => ({ ...prev, display: "none" }))}
          />
        </div>
      )}
    </div>
  );
};

export default EditProduct;
