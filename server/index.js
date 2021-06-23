const express = require("express");

const app = express();

const cors = require('cors');

const multer  = require('multer')

const FileType = require("file-type");

const fs = require("fs");

// app.use(express.static("public")); it serves all static files from public folder, if created

const storage = multer.diskStorage({
    destination: "uploads",
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        if (!file.mimetype.match(/.(jpg|jpeg|png)$/i)) {
            return cb(new Error("wrong file"));
        }
        cb(null, true);
    }
}).single("file");

app.options('/upload-image', cors());

app.use("/uploads", express.static("uploads"));

app.post("/upload-image", cors(), (req, res, next) => {
    upload(req, res, function(err){
        if (err instanceof multer.MulterError) {
            res.status(400).json({status: false, message: "server error"});
        }
        else if(err){
            console.log(err);
            res.status(400).json({status: false, message: "wrong file type"});
        }
        else{
            readFileType(req.file.path).then(file => {
                if (!file.mime.match(/.(jpg|jpeg|png)$/i)) {
                    fs.unlink(req.file.path, err =>{
                        if (err) throw err;
                    });
                    res.status(400).json({status: false, message: "wrong file extension"});
                }
                else{
                    let pathUrl = req.protocol + '://' + req.get('host')  + "/" + req.file.path;
                    
                    res.status(200).json({status: true, url: pathUrl.replace("http", "https")});
                }
            });
        }
    });
});

async function readFileType(file) {
    const mime = await FileType.fromFile(file);
    return mime;
}

var port = process.env.PORT || 8080;

app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
});