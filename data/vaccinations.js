var dataBase = require("./connection.js");
var workers = require("./workers.js")
exports.getWorkerVaccinations = (req, res) => {
    const workerID = req.params.workerID
    if (workerID) {
        let sql = `SELECT * FROM vaccination WHERE workerID=${workerID}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);
        })
    }
}
exports.getWorkerVaccinationByNum = (req, res) => {
    const workerID = req.params.workerID
    const numVaccination = req.params.numVaccination
    if (workerID && numVaccination >= 1 && numVaccination <= 4) {
        let sql = `SELECT * FROM vaccination WHERE workerID = ${workerID} and vaccinationID=${numVaccination}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);
        })
    }
}

exports.addWorkerVaccination = (req, res) => {
    const data = req.body;

    var sql =
        `SELECT COUNT(*) num 
         from vaccination
         where workerID=${data.workerID}`;
    dataBase.query(sql, (err, result) => {
        if (err) {
            res.status(400).send({ mas: err });
        }
        else if (parseInt(result[0].num, 10) < 4) {
            var sql2 = `select count(*) as count from workers where workerID=${data.workerID}`;
            dataBase.query(sql2, (err, result) => {
                if (err)
                    res.status(400).send({ mas: err });
                else if (parseInt(result[0].count) > 0 && (data.manufacturer == "moderna" || data.manufacturer == "pfizer") && !isNaN(Date.parse(data.dateOfTaking))) {
                    sql3 = `INSERT INTO vaccination (dateOfTaking,manufacturer,workerID)
                        VALUES ('${data.dateOfTaking}','${data.manufacturer}',${data.workerID})`;
                    dataBase.query(sql3, (err, result) => {
                        if (err)
                            res.status(400).send({ mas: err });

                    })
                    res.send(result);
                }
                else {
                    res.status(422).send({ mas: "one or more of your details are in correct" })
                }
            })

        }
        else {
            res.status(422).send({ mas: "one or more of your details are in correct" })
        }
    })

}
