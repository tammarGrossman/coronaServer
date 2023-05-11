import React,{useEffect,useState}from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    
    workerID: yup.number().required(),
    dateOfIllness: yup.string().required(),
    dateOfRecovery: yup.string().required(),
}).required();

const AddCorona = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)

    });

    const onSubmit = (data) => {
        //להוספה לטבלה של קורונה
        fetch('http://localhost:8080/corona',
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

            <label>תאריך תחלואה</label>
            <input className="formT"{...register("dateOfIllness")} />
            <p>{errors.dateOfIllness?.message}</p>

            <label>תאריך החלמה</label>
            <input className="formT"{...register("dateOfRecovery")} />
            <p>{errors.dateOfRecovery?.message}</p>

            <input type="submit" />
        </form>
    );
}




export default AddCorona
