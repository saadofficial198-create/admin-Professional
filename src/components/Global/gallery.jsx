// components/ImageGallery.jsx
const ImageGallery = ({ images, onSelect, onClose }) => {
  const popup = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const gallery = {
    overflowY: "scroll",
    display: "flex",
    gap: "20px",
    height: "calc(100% - 40px)",
    flexWrap: "wrap",
    flexDirection: "row",
  };

  const actions = {
    textAlign: "end",
  };

  const boxes = {
    width: "23%",
    height: "200px",
    border: "1px solid #000",
    background: "#000000b0",
    borderRadius: "10px",
    objectFit: "cover",
    cursor: "pointer",
  };

  return (
    <div style={popup}>
      <div style={gallery}>
        {images.length > 0 ? (
          images.map((img, index) =>
            img?.url ? (
              <img
                key={index}
                src={img.url}
                alt={img.name || "No Name"}
                style={boxes}
                onClick={() => onSelect(img.url )}
              />
            ) : null
          )
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div style={actions}>
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
