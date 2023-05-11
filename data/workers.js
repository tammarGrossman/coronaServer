var dataBase = require("./connection.js");
exports.getWorkers = (req, res) => {
    let sql = 'SELECT * FROM workers'
    dataBase.query(sql, (err, result) => {
        if (err) 
           res.status(400).send({ mas: err });
        res.send(result);
    })
}
exports.getWorker = (req, res) => {
    const workerID = req.params.workerID
    if (workerID) {
        let sql = `SELECT * FROM workers WHERE workerID = ${workerID}`
        dataBase.query(sql, (err, result) => {
            if (err)
               res.status(400).send({ mas: err });         
            res.send(result);
        })
    }
}

exports.addWorker = (req, res) => {
    const data = req.body;
    let sql = ""
    if (data&&!isNaN(Date.parse(data.workerBirth))) 
    {
        sql = `INSERT INTO workers (workerID,workerFullName,workerAdress,workerPhone,workerMobilePhone,workerBirth)
        VALUES (${data.workerID},'${data.workerFullName}','${data.workerAdress}','${data.workerPhone}','${data.workerMobilePhone}','${data.workerBirth}')`; 
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);

        })
    }
    else{
    res.send({mas:"one or more of your details are in correct"});
    }

  }
