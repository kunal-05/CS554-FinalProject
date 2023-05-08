const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const importedData = require("../data/FinalEmployerDataJobTitle.json")
const citizenData = require("../data/CitizenShip.json")
const yearData = require("../data/YearWise.json")
client.connect().then(() => {});

router.get('/', async (req, res) => {
  console.log('Show List not cached');
  let data = importedData

  console.log(data)
  return res.json({"data":data})
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

router.get('/:id', async (req, res) => {
  console.log('data not cached');
  let data = importedData
  const id = req.params.id;

  console.log("id in backend-->",id)
  const showData = data.find((obj) => obj._id === id);
  //return showData ? foundObj.name : "Not found";

  console.log("SHowdata from backeend-->",showData);
  return res.json({"data":showData? showData: 'No Data'})
});

module.exports = router;