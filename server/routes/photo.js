const express = require("express");
const router = express.Router();

var im = require("imagemagick-stream");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

router.post("/photo", upload, async (req, res) => {
    res.set("Content-Type", "image/jpeg");
    console.log("fired");
    try {
        const resize = im().resize("100x100").quality(90);
        const bufferStream = new require("stream").PassThrough();
        bufferStream.end(req.file.buffer);
        bufferStream.pipe(resize).pipe(res);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
});

module.exports = router;
