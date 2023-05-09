const employersRoutes = require("./employers");
const photo = require("./photo");

const configRoutes = (app) => {
    app.use("/", employersRoutes);
    // app.use("/:id",employersRoutes);
    app.use("/photo", photo);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found- Contact Authors" });
    });
};

module.exports = configRoutes;
