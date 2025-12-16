import { useState } from "react";
import "../styles/globals.css";
import ImageGallery from "../components/Global/gallery";

const Product = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [selectingVariantIndex, setSelectingVariantIndex] = useState(null);
  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState([]);

  const [error, setError] = useState("");
  const [overlauy, setOverlauy] = useState({
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "#00000061",
    display: "none",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, price: value }));
    }
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { color: "", colorCode: "", size: "", price: "", stock: "", image: "" }]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      name: formData.name,
      description: formData.description,
      ...(hasVariants ? { variants } : { image: formData.image }),
      ...(hasVariants ? { variants } : { price: formData.price, stock: formData.stock, })
    };
    console.log(payload);
    try {
      const res = await fetch("http://localhost:7000/add-new-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setFormData({ name: "", description: "", price: "", stock: "", image: "" });
        setVariants([]);
        alert("Product added successfully!");
      } else {
        setError(data.message || "Failed to add product.");
      }
    } catch (error) {
      setError("An error occurred while uploading the product.");
    }
  };

  const fetchImages = async () => {
    try {
      setOverlauy((prev) => ({ ...prev, display: "block" }));
      const response = await fetch("http://localhost:7000/media");
      const data = await response.json();
      setImages(data.products || data || []);
      console.log("Fetched images:", data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageSelect = (imgUrl) => {
    if (selectingVariantIndex !== null) {
      // For variant
      const updatedVariants = [...variants];
      updatedVariants[selectingVariantIndex].image = imgUrl;
      setVariants(updatedVariants);
      setSelectingVariantIndex(null);
    } else {
      // For main product image
      setFormData((prev) => ({
        ...prev,
        image: imgUrl,
      }));
    }

    setOverlauy((prev) => ({
      ...prev,
      display: "none",
    }));
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
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Add New Product</h2>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <label>
          <input
            type="checkbox"
            checked={hasVariants}
            onChange={() => setHasVariants(!hasVariants)}
          />{" "}
          This product has variants (like size/color)
        </label>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input type="hidden" name="image" value={formData.image} required />

        {formData.image && (
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <img
              src={formData.image}
              alt="Selected"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        )}
        {!hasVariants && (
          <button
            type="button"
            style={{ ...buttonStyle, marginBottom: "10px" }}
            onClick={fetchImages}
          >
            Select Image
          </button>
        )}
        <textarea
          name="description"
          placeholder="Product Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {!hasVariants && (
          <>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handlePriceChange}
              style={inputStyle}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </>
        )}

        {hasVariants && (
          <>
            <h4>Variants</h4>
            {variants.map((variant, index) => (
              <div key={index} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Color Name"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Color Code"
                  value={variant.colorCode}
                  onChange={(e) => handleVariantChange(index, "colorCode", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Size"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                  style={inputStyle}
                />
                <div key={index} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                  {/* Other inputs... */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {variant.image && (
                      <img src={variant.image} alt="Variant" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectingVariantIndex(index);
                        fetchImages();
                      }}
                      style={buttonStyle}
                    >
                      Select Image
                    </button>
                  </div>
                </div>

                <button type="button" onClick={() => removeVariant(index)} style={{ ...buttonStyle, backgroundColor: "#d9534f" }}>
                  Remove Variant
                </button>
              </div>
            ))}
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button type="button" onClick={addVariant} style={buttonStyle}>
                + Add Variant
              </button>
              <button
                type="button"
                onClick={() => {
                  if (variants.length > 0) {
                    const lastVariant = variants[variants.length - 1];
                    setVariants([...variants, { ...lastVariant }]);
                  } else {
                    alert("No variant to duplicate. Please add one first.");
                  }
                }}
                style={{ ...buttonStyle, backgroundColor: "#007bff" }}
              >
                📋 Duplicate Last Variant
              </button>
            </div>


          </>
        )}

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {overlauy.display === "block" && (
        <div style={overlauy}>
          <ImageGallery
            images={images}
            onSelect={handleImageSelect}
            onClose={() =>
              setOverlauy((prev) => ({ ...prev, display: "none" }))
            }
          />
        </div>
      )}
    </div>
  );
};

export default Product;
