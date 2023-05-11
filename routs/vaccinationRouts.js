const express = require("express");
const vaccinations = require("../data/vaccinations")
const router = express.Router();
router.get("/:numVaccination/:workerID", vaccinations.getWorkerVaccinationByNum)
router.get("/:workerID", vaccinations.getWorkerVaccinations)
router.post("",vaccinations.addWorkerVaccination)
module.exports = router
