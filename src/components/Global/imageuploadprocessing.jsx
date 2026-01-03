import { useEffect, useRef, useState } from "react";
import { Processing, DoubleCheck, Arrow, Image } from "../../assets/icons";
import { uploadMedias } from "../../services/api.js";
import "../../styles/image-processing.css";

const ImageUploadProcessing = ({ files = [], setFiles }) => {
    const uploadingRef = useRef(new Set());
    const [open, setOpen] = useState(true);
    const listRef = useRef(null);
    // Upload each pending file
    useEffect(() => {
        files.forEach((file) => {
            if (file.status !== "pending") return;
            if (uploadingRef.current.has(file.id)) return;
            uploadingRef.current.add(file.id);


            const uploadFile = async () => {
                // Set status → processing
                setFiles(prev =>
                    prev.map(f =>
                        f.id === file.id ? { ...f, status: "processing" } : f
                    )
                );

                const formData = new FormData();
                formData.append("media", file.file);
                formData.append("names", file.file.name);

                try {
                    const data = await uploadMedias(formData);
                    setFiles(prev =>
                        prev.map(f =>
                            f.id === file.id
                                ? { ...f, status: data.uploaded ? "completed" : "failed" }
                                : f
                        )
                    );
                    uploadingRef.current.delete(file.id);
                } catch (err) {
                    console.error("Upload error:", err);
                    setFiles(prev =>
                        prev.map(f =>
                            f.id === file.id ? { ...f, status: "failed" } : f
                        )
                    );
                    uploadingRef.current.delete(file.id);
                }
            };

            uploadFile();
        });
    }, [files, setFiles]);

    const shortenFileName = (name) => {
        if (name.length <= 20) return name;
        return name.substring(0, 20) + "...";
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
