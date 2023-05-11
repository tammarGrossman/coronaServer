import React,{useEffect,useState}from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    workerID:yup.number().required(),
    workerFullName: yup.string().required("חובה לשים שם"),
    workerAdress: yup.string().required(),
    workerBirth: yup.string().required(),
    workerMobilePhone: yup.string(),
    workerPhone: yup.string()
}).required();

const AddWorker = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        //להוספה לטבלה של העובדים
        fetch('http://localhost:8080/workers',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .catch(err => alert("ERROR"))
        alert("הפעולה הושלמה בהצלחה")
    }

    return (
    
        <form onSubmit={handleSubmit(onSubmit)}>
           <label>קוד עובד</label>
            <input className="formT"{...register("workerID")} />
            <p>{errors.workerID?.message}</p>

            <label>שם עובד</label>
            <input className="formT"{...register("workerFullName")} />
            <p>{errors.workerFullName?.message}</p>

            <label>כתובת</label>
            <input className="formT"{...register("workerAdress")} />
            <p>{errors.workerAdress?.message}</p>

            <label>ת.לידה</label>
            <input className="formT"{...register("workerBirth")} />
            <p>{errors.workerBirth?.message}</p>

            <label>טלפון</label>
            <input  className="formT"{...register("workerPhone")} />
            <p>{errors.Phone?.message}</p>

            <label>טלפון נייד</label>
            <input  className="formT"{...register("workerMobilePhone")} />
            <p>{errors.workerMobilePhone?.message}</p>

            <input type="submit" />
        </form>
    );
}
export default AddWorker
