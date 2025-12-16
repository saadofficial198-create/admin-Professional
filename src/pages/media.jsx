import React, { useEffect, useState } from "react";

const Media = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [imageName, setImageName] = useState("");

  // Fetch images
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:7000/media");
      const data = await response.json();
      setImages(data.products || data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle upload
  const handleUpload = async () => {
    if (!uploadFile || !imageName.trim()) {
      alert("Please select an image and enter a name!");
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadFile);
    formData.append("name", imageName.trim());

    try {
      const response = await fetch("http://localhost:7000/upload-media", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.newImage && data.newImage.image) {
        setImages((prev) => [data.newImage, ...prev]);
      } else {
        console.error("Uploaded image data is missing or broken:", data);
        alert("Upload succeeded but response data was broken. Please refresh.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }

    setShowPopup(false);
    setUploadFile(null);
    setImageName("");
  };

  return (
    <div style={containerStyle}>
      {/* Button */}
      <div style={addNewButtonWrapper}>
        <button onClick={() => setShowPopup(true)} style={addButtonStyle}>
          + Add New
        </button>
      </div>

      {/* Gallery */}
      <div style={galleryStyle}>
        {images.length > 0 ? (
          images.map((img, index) =>
            img?.image ? (
              <div
                key={img._id || index}
                style={imageBoxStyle}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.image}
                  alt={img.name || "No Name"}
                  style={imageStyle}
                />
              </div>
            ) : null
          )
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Details */}
      <div style={detailsStyle}>
        {selectedImage ? (
          <div>
            <h3>Image Details</h3>
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              style={detailImageStyle}
            />
            <p><strong>Name:</strong> {selectedImage.name}</p>
            <p><strong>Price:</strong> ${selectedImage.price || "N/A"}</p>
            <p><strong>ID:</strong> {selectedImage._id}</p>
            <p><strong>URL:</strong> <a href={selectedImage.image} target="_blank" rel="noopener noreferrer">{selectedImage.image}</a></p>
          </div>
        ) : (
          <p>Select an image to view details</p>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div style={popupOverlay}>
          <div style={popupStyle}>
            <h2>Upload New Image</h2>
            <input
              type="text"
              placeholder="Enter image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              style={inputStyle}
            />
            <br /><br />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setUploadFile(e.target.files[0])}
              style={inputStyle}
            />
            <br /><br />
            <button onClick={handleUpload} style={uploadButtonStyle}>Upload</button>
            <button onClick={() => setShowPopup(false)} style={cancelButtonStyle}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = { display: "flex", padding: "20px" };
const addNewButtonWrapper = { flex: "0 0 150px", marginRight: "20px", display: "flex", alignItems: "start" };
const galleryStyle = { flex: "2", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "15px" };
const imageBoxStyle = { border: "1px solid #ccc", padding: "5px", borderRadius: "8px", cursor: "pointer", backgroundColor: "#f9f9f9" };
const imageStyle = { width: "100%", height: "auto", borderRadius: "4px" };
const detailsStyle = { flex: "1", marginLeft: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fafafa" };
const detailImageStyle = { width: "100%", height: "auto", marginBottom: "10px" };
const addButtonStyle = { width: "150px", height: "150px", fontSize: "18px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" };
const popupOverlay = { position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const popupStyle = { backgroundColor: "#fff", padding: "30px", borderRadius: "10px", textAlign: "center", minWidth: "300px" };
const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" };
const uploadButtonStyle = { margin: "10px", padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };
const cancelButtonStyle = { margin: "10px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };

export default Media;
