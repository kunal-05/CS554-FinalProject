const employersRoutes = require("./employers");


const configRoutes = (app) => {
  app.use("/", employersRoutes);
 // app.use("/:id",employersRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found- Contact Authors" });
  });
};

module.exports = configRoutes
