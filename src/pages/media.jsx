import "../styles/media.css"
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { getResizedCloudinaryUrl } from "../utils/cloudinary.js";
import { formatFileSize } from "../utils/formatfilesize.js";
import { getAllMedias, getCloudinaryDetials } from "../services/api.js";
import {
  Search,
  CloudUpload,
  Bin,
  Pencil,
  ArrowLeft,
  ArrowRight,
  map,
  Check2
} from "../assets/icons/index.js";

import ImageUploadProcessing from "../components/Global/imageuploadprocessing.jsx";

const Media = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [mediaDetails, setMediaDetails] = useState({});
  const usedPercentage = mediaDetails?.totalUsed && mediaDetails?.limit ? (mediaDetails.totalUsed / mediaDetails.limit) * 100 : 0;
  const visiblePercentage = usedPercentage > 0 && usedPercentage < 2 ? 2 : usedPercentage;
  const rotation = -180 + (visiblePercentage / 100) * 180;


  // Get All media
  useEffect(() => {
    getAllMedias()
      .then((medias) => setData(medias))
      .catch((error) => console.error("Error fetching medias:", error));
    getCloudinaryDetials()
      .then((data) => setMediaDetails(data))
      .catch((err) => console.error("Error fetching Cloudinary details:", err));
  }, []);
  console.log("Media Details:", mediaDetails);
  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files);
    const formatted = selected.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      status: "pending"
    }));

    setFiles(formatted);
  };

  return (
    <div className="container media">
      {/* Head */}
      <div className="page-header">
        <h1>Media</h1>
        <div className="search">
          <Search className="icon" />
          <input type="text" placeholder="Search for..." />
        </div>
        <button>Create Upload</button>
      </div>
      <div className="medias d-flex gap-30">
        <div className="media-files d-flex flex-column gap-30">
          {/* Upload Files */}
          <div
            id="uploadfiles"
            className="upload-file"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              className="d-none"
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFilesChange}
            // onChange={(e) => setUploadFile(e.target.files[0])}
            />
            <div className="upload-icon">
              <CloudUpload className="icon white" />
            </div>
            <h5><strong>Click here</strong> to upload file or drag.</h5>
            <p>Supported Format: SVG, JPG, PNG (10mb each)</p>
          </div>
          {/* Table */}
          <div className="table-wrapper">
            <div className="table-container">
              <div className="table-head d-flex between j-center">
                <h4 className="white">All Medias</h4>
                <p>
                  <b>1-10</b> of 120
                </p>
              </div>

              <div className="table media">
                {/* Table Head */}
                <div className="table-row table-head">
                  <div className="table-cell checkbox">
                    <input type="checkbox" className="table-checkbox" />
                  </div>
                  <div className="table-cell">File Name</div>
                  <div className="table-cell">File Size</div>
                  <div className="table-cell">Last Modified</div>
                  <div className="table-cell"></div>
                </div>

                {/* Table Body */}
                {data.map((media) => (
                  <div className="table-row" key={media._id}>
                    <div className="table-cell checkbox">
                      <input type="checkbox" className="table-checkbox" />
                    </div>
                    <div className="table-cell product-image">
                      <img
                        src={getResizedCloudinaryUrl(media.url, 90, 90)}
                        alt={media.name}

                        className="table-img"
                      />
                      {media.name}
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
                      {formatFileSize(media.size)}
                    </div>
                    <div className="table-cell">
                      {media?.upload.month[1]}, {media?.upload.day[0]}, 20{media?.upload.year}
                    </div>
                    <div className="table-cell action">
                      <Link to={`/edit-product/${media._id}`}>
                        <Pencil className="icon icon-15 c-pointer" />
                      </Link>
                      <Link to={`/edit-product/${media._id}`}>
                        <Bin className="icon icon-15 c-pointer bin" />
                      </Link>
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
        <div className="storage">
          <h3 className="hrad-cell white"> Storage</h3>
          <div className="storage-chart">
            <span className="persent">
              {usedPercentage.toFixed(1)}%
            </span>
            <span className="storage-have">
              {formatFileSize(mediaDetails.totalUsed || 0)} Used of{" "}
              {formatFileSize(mediaDetails.limit || 0)}
            </span>
            <div className="storage-usage" style={{ transform: `rotate(${rotation}deg)` }}></div>
            <div className="storage-left"></div>
          </div>
          <div className="s-divider"></div>
        </div>
      </div>
      {files.length > 0 && (
        <ImageUploadProcessing
          files={files}
          setFiles={setFiles}
        />
      )}
    </div>
  );
};
export default Media;