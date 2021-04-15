import React from "react";
import "../styles/upload-status.scss"

function UploadStatus() {
    
    return (
        <>
            <section className="upload-container">
                <div className="container-status">
                    <h1>Uploading...</h1>
                    <div className="status-bar">
                        <div className="fill"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default UploadStatus;