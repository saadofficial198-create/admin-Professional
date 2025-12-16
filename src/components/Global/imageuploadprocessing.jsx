import { useEffect, useRef, useState } from "react";
import { Processing, DoubleCheck, Arrow, Image } from "../../assets/icons";
import "../../styles/image-processing.css";

const ImageUploadProcessing = ({ files = [], setFiles }) => {
    const [open, setOpen] = useState(true);
    const listRef = useRef(null);
    // Upload each pending file
    useEffect(() => {
        files.forEach((file, index) => {
            if (file.status !== "pending") return; // upload only once

            const uploadFile = async () => {
                // Set status → processing
                setFiles(prev => {
                    const updated = [...prev];
                    updated[index].status = "processing";
                    return updated;
                });

                const formData = new FormData();
                formData.append("media", file.file);
                formData.append("names", file.file.name);

                try {
                    const res = await fetch("http://localhost:7000/upload-media", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await res.json();

                    setFiles(prev => {
                        const updated = [...prev];
                        updated[index].status =
                            res.ok && data.uploaded ? "completed" : "failed";
                        return updated;
                    });
                } catch (err) {
                    console.error("Upload error:", err);

                    setFiles(prev => {
                        const updated = [...prev];
                        updated[index].status = "failed";
                        return updated;
                    });
                }
            };

            uploadFile();
        });
    }, [files, setFiles]);

    const shortenFileName = (name) => {
        const parts = name.split(".");
        const ext = parts.pop();
        const base = parts.join(".");
        return base.substring(0, 15) + "...." + ext;
    };

    const completedCount = files.filter(f => f.status === "completed").length;

    return (
        <div className="image-upload-processing">

            {/* Header */}
            <div className="db-head cu-pointer" onClick={() => setOpen(!open)}>
                <span>Files {completedCount}/{files.length}</span>

                <Arrow
                    width="23px"
                    height="23px"
                    className={`icon arrow-icon ${open ? "rotate" : ""}`}
                />
            </div>

            {/* Dropdown List */}
            {open && (
                <ul
                    ref={listRef}
                    className={`dropdown-ul ${open ? "open" : ""}`}
                >
                    {files.map((file) => (
                        <li key={file.id}>
                            <div>
                                <Image width="20px" height="20px" />
                                <span>{shortenFileName(file.name)}</span>
                            </div>

                            {file.status === "processing" && (
                                <Processing className="icon processing" width="20px" />
                            )}

                            {file.status === "completed" && (
                                <DoubleCheck className="icon" width="20px" />
                            )}

                            {file.status === "failed" && (
                                <span className="failed">Failed</span>
                            )}
                        </li>
                    ))}
                </ul>

            )}

        </div>
    );
};

export default ImageUploadProcessing;
