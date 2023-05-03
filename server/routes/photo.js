const express = require("express");
const router = express.Router();

var im = require("imagemagick");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

router.post("/photo", upload, async (req, res) => {
    res.set("Content-Type", "image/jpeg");
    console.log("fired");
    try {
        return res.send(
            im.convert([req.file.buffer, "-resize", "100x100", "-", "jpg:-"])
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
});

module.exports = router;
