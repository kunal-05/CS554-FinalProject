const express = require("express");
const router = express.Router();
const redis = require("redis");
const client = redis.createClient();
<<<<<<< HEAD
const importedData = require("../data/FinalEmployerDataJobTitle.json")
const citizenData = require("../data/CitizenShip.json")
const yearData = require("../data/YearWise.json")
=======
const importedData = require("../data/FinalEmployerDataJobTitle.json");
>>>>>>> d388f6a (updated emplyerDetails page and redis)
client.connect().then(() => {});

router.get("/", async (req, res) => {
  console.log("Show List not cached -  home route /");
  let cachedFullCompanyData = await client.get("data");
  if (cachedFullCompanyData) {
    let cachedCompanyList = JSON.parse(cachedFullCompanyData);
    console.log(`--- Full data returned from redis cache ---`);
    return res
      .status(200)
      .json({ data: cachedCompanyList ? cachedCompanyList : `NoData` });
  } else {
    //get the data and store in redis
    let data = importedData;
    const key = `data`;
    let cacheData = await client.set(key, JSON.stringify(data));
    console.log(`Full data stored in cache -->`, cacheData);
    return res.status(200).json({ data: data });
  }
});

router.get('/employeeCitizenship', async (req, res) => {
  console.log('Show List not cached');
  let data = citizenData
  return res.json({"data":data})
});

router.get('/yearData', async (req, res) => {
  console.log('Show List not cached');
  let data = yearData
  return res.json({"data":data})
});

router.get("/:id", async (req, res) => {
  let data = importedData;
  const id = req.params.id;
  console.log("server id ->", id);
  //id validations
  if (!id) {
    return res.status(400).json({
      error: "ERROR: No id is provided.",
    });
  }
  if (typeof id !== "string" || id == null) {
    res.status(400).json({ error: "ERROR: ID must be a string" });
    return;
  }
  if (id.trim().length === 0 || id == "") {
    return res.status(400).json({
      error:
        "ERROR: Invalid ID in req.params - must be a string and no empty spaces",
    });
  }

  //check if id stored in cache?
  let cachedDataById = await client.get(id);
  if (cachedDataById) {
    let cachedEmployerDetails = JSON.parse(cachedDataById);
    console.log(`Data for id: ${id} is returned from Redis`);
    return res
      .status(200)
      .json({ data: cachedEmployerDetails ? cachedEmployerDetails : `NoData` });
  } else {
    //cache the data first then return
    const showData = data.find((obj) => obj._id === id);
    const key = `${id}`;
    let cacheData = await client.set(key, JSON.stringify(showData));
    console.log(`Data cahced for id: ${id} -->`, cacheData);
    return res.status(200).json({ data: showData ? showData : `NoData` });
  }
});

module.exports = router;
