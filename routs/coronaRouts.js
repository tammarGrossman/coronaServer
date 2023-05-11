const express = require("express");
const corona = require("../data/corona")
const router = express.Router();
router.get("/:workerID", corona.getWorkerCoronaDetails)
router.post("",corona.addWorkerCoronaDetails)
module.exports = router
