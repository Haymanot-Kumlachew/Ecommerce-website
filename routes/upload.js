const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')


// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//router.post('/upload',auth , authAdmin, (req, res) =>{
//     try {

router.post('/upload',  (req, res) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})

        //const file = req.files.file;

        if(req.files.length > 1024*1024){
            removeTmp(req.files.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }



        if(req.files.mimeType !== 'image/jpeg' && req.files.mimetype !== 'image/png'){
            removeTmp(req.files.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }



        /*var cloudinary = require('cloudinary').v2;
        cloudinary.uploader.upload(file.tempFilePath, function(error, result) { console.log(result) });*/

        cloudinary.v2.uploader.upload(req.files.tempFilePath, {folder: "test"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(req.files.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })

    }
    catch (e) {
        return res.status(500).json({msg: e.message})
    }
    const removeTmp = (path) => {
        fs.unlink(path, err => {
            if(err) throw err;
        })
    }
})

module.exports = router;
