var dataBase = require("./connection.js");

exports.getWorkerCoronaDetails = (req, res) => {
    const workerID = req.params.workerID
    if (workerID) {
        let sql = `SELECT * FROM corona WHERE workerID = ${workerID}`
        dataBase.query(sql, (err, result) => {
            if (err)
               res.status(400).send({ mas: err });         
            res.send(result);
        })
    }
}

exports.addWorkerCoronaDetails = (req, res) => {
    const data = req.body;
    var sql =
        `SELECT COUNT(*) num 
         from workers
         where workerID=${data.workerID}`;
        
         dataBase.query(sql, (err, result) => {     
            if (err)
            {
                res.status(400).send({ mas: err });
            }     
            else if(parseInt(result[0].num,10)>0 &&!isNaN(Date.parse(data.dateOfIllness))&&!isNaN(Date.parse(data.dateOfRecovery)))
            {
                sql2 = `INSERT INTO corona (dateOfRecovery,workerID,dateOfIllness)
                VALUES ('${data.dateOfRecovery}',${data.workerID},'${data.dateOfIllness}')`; 
                dataBase.query(sql2,(err,result) =>{
                    if(err)
                       res.status(400).send({ mas: err });                  
                      })
                res.send(result);
            }
            else
            {
            res.status(422).send({ mas:"one or more of your details are in correct"});
            }
     })                  
}