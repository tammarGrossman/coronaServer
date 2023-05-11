const express = require("express");
const workers = require("../data/workers")
const router = express.Router();
router.get("", workers.getWorkers)
router.get("/:workerID", workers.getWorker)
router.post("",workers.addWorker)
module.exports = router


