import React, {useState, useEffect, useRef} from "react";
import Image from "../images/checkmark-icon.svg";
import ReturnImage from "../images/return-icon.svg";
import "../styles/upload-success.scss"

function UploadSuccessful({url}) {

    const txtArea = useRef(null);

    useEffect(() => {
        txtArea.current.value = url;
        document.execCommand('copy');
        
    }, [url])

    function copyLink() {
        txtArea.current.select();
        document.execCommand("copy");
    }

    return (
        <>
            <section className="success-container">
                <img src={Image} alt="check mark" className="check-icon"/>
                <h1>Uploaded successfully!</h1>
                <div className="image-container">
                    <img src={url} alt="uploaded" className="image-uploaded"/>
                </div>
                <div className="copy-container">
                    <input type="text" className="link" ref={txtArea}/>
                    <button type="button" onClick={() => copyLink()}>Copy Link</button>
                </div>
            </section>
            
            <button type="button" className="return-btn"><a href="/">Upload a new image</a><img src={ReturnImage} alt="return to main page"/></button>
        
        </>
    )

}

export default UploadSuccessful;