//index file

const photo = require("./photo");

const constructorMethod = (app) => {
    app.use("/", photo);
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

module.exports = constructorMethod;
