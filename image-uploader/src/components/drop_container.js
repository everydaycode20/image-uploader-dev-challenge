import React, {useState,useEffect} from "react";
import DropDown from "./drop-down";
import UploadStatus from "./upload_status";
import UploadSuccessful from "./upload_success";
import "../styles/drop-container.scss"

function DropContainer() {
    
    const [file, setFile] = useState(null);

    const [url, setUrl] = useState(null);

    const [statusUrl, setStatusUrl] = useState(false);

    const [error, setError] = useState(null);

    const [errorVisibility, setErrorVisibility] = useState(false);

    useEffect(() => {
        setStatusUrl(false);
        setError(null);
        setErrorVisibility(false);
        file && sendImage(file);
        
    }, [file])
    
    useEffect(() => {
        
        setTimeout(() => {
            setErrorVisibility(true);
        }, 4000);

    }, [error])

    function sendImage(file) {
        
        let request = new XMLHttpRequest();

        request.onreadystatechange = function(){
            
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                
                if (response) {
                    setUrl(response.url);
                    setStatusUrl(true);
                    setError(null);
                }
            }
            else if (this.readyState == 4 && this.status == 400) {
                let response = JSON.parse(this.responseText);
                setError(response.message);
                setStatusUrl(false);
                console.log(response);
            }
        }
        
        var formData = new FormData();
        formData.append("file", file);
        request.open("POST", "https://imageuploader-dev-challenge.herokuapp.com/upload-image", true);
        // request.setRequestHeader("Content-Type", "application/json");
        request.send(formData);
    }

    if (file && !statusUrl && error === null) {
        return <UploadStatus />
    }

    if (statusUrl) {
        return <UploadSuccessful url={url}/>
    }

    if (!file || error) {
        return (
            <>
                <section className="container">
                    <h1>Upload your image</h1>
                    <h2>File should be Jpeg or Png</h2>
                    <DropDown setFile={setFile}/>
                </section>
                {error && !errorVisibility && <section className="error-msg"><h3>{error}</h3></section>}
            </>
        )
    }
}

export default DropContainer;