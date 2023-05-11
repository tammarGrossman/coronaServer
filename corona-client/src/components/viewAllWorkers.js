import React, { useEffect, useState } from 'react'
import AddWorker from './addWorker';
import AddCorona from './addCorona';
import AddVaccination from './addVaccination';
import "../css/styleAll.css"

const ViewAllWorkers = () => {
  const [addWor, setAddWor] = useState(false);
  const [addCorona, setAddCorona] = useState(false);
  const [addVaccination, setAddVaccination] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [workersShow, setWorkersShow] = useState(false);
  const [selectWoId, setSelectWoId] = useState(0);
  const[workerByID,setWorkerByID]=useState(false);

  useEffect(() => {
    if (workersShow === true) {
      fetch("http://localhost:8080/workers")
        .then(response => response.json())
        .then(response => setWorkers(response))
        .catch(err => alert("ERROR"))
    }
  }, [workersShow])

  useEffect(() => {
    fetch("http://localhost:8080/workers")
      .then(response => response.json())
      .then(response => setWorkers(response))
      .catch(err => alert("ERROR"))
  }
    , [addWor])

    useEffect(() => {
      if(workerByID)
      fetch("http://localhost:8080/workers/")
        .then(response => response.json())
        .then(response => setWorkers(response))
        .catch(err => alert("ERROR"))
    }
      , [workerByID])

  return (
    <div>
      <div className='allBtns'>
        <button className="btn" onClick={() => {setWorkersShow(!workersShow);setAddWor(false);setAddVaccination(false);setAddCorona(false)}}>צפייה בעובדים</button>
        <button className="btn"onClick={() => {setAddWor(!addWor);setWorkersShow(false);setAddVaccination(false);setAddCorona(false)}}>להוספת עובד חדש</button> 
        <button className="btn"onClick={() => {setAddVaccination(!addVaccination);setWorkersShow(false);setAddWor(false);setAddCorona(false)}}>להוספת חיסון</button> 
        <button className="btn"onClick={() => {setAddCorona(!addCorona);setAddVaccination(false);setWorkersShow(false);setAddWor(false)}}>להוספת חולה קורונה</button> 
      </div>
      <div className="allworkers">
        {
          (workersShow === true) &&
          <div>
            {!addWor && workers.map((x) =>
              <div className="worker" key={x.workerID}>
                <h5 >שם עובד:{x.workerFullName}</h5>
                <h5 >כתובת:{x.workerAdress}</h5>
                <h5 >תאריך לידה:{x.workerBirth}</h5>
                <h5>פלאפון:{x.workerPhone}</h5>
                <h5 >נייד:{x.workerMobilePhone}</h5>
                {/* {x.workerID === selectWoId ? <AddWorker user={x} setSelectedID={() => setSelectWoId(null)} /> : null} */}
              
              </div>
            )}                  
          </div>
        }
      </div>
      {
        (addWor&& <AddWorker/>)||
        (addCorona && <AddCorona/>)||
        (addVaccination&&<AddVaccination/>)
      }
    </div>
  )
}
export default ViewAllWorkers


