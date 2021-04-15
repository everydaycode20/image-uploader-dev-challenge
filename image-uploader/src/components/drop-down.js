import React, {useState, useRef} from "react";
import Image from "../images/image.svg";
import "../styles/drop-down.scss"

function DropDown({setFile}) {
    
    const [isImage, setIsImage] = useState(false);

    const input = useRef();

    const dragOver = e => {
        setIsImage(true);
        e.preventDefault();
    }

    const dragLeave = e =>{
        setIsImage(false);
        e.preventDefault();
    }

    const openInput = () => {
        input.current.click();
    }

    const drop = e => {
        e.preventDefault();
        const files = [...e.dataTransfer.files]
        handleFile(files);
    }
    
    function handleFile(file) {
        if (!file[0].type.match(/.(jpg|jpeg|png)$/i)) {
            setIsImage(false);
        }
        else{
            setFile(file[0]);
        }
    }
    
    const handleInputFile = e =>{
        let file = e.target.files;
        setFile(file[0]);
    }

    return (
        <>
            <section className="drop-down-container" onDragOver={e => dragOver(e)} onDrop={e => drop(e)} name="file" onDragLeave={e => dragLeave(e)} image-contrast={isImage.toString()}>
                <img src={Image} alt="mountains"/>
                <p>Drag & Drop your image here</p>
            </section>
            <p>Or</p>
            <input type="file" style={{display:'none'}} name="file" id="choose-file-input" ref={input} onChange={e => handleInputFile(e)}/>
            <button className="choose-file" type="button" onClick={() => openInput()}>Choose file</button>
        </>
    )
}

export default DropDown;