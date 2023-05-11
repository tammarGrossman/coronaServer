import React,{useEffect,useState}from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    
    workerID: yup.number().required(),
    dateOfTaking: yup.string().required(),
    manufacturer: yup.string().required(),
}).required();

const AddVaccination = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        //להוספה לטבלה של קורונה
        fetch('http://localhost:8080/vaccinations',
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

            <label>תאריך מתן חיסון</label>
            <input className="formT"{...register("dateOfTaking")} />
            <p>{errors.dateOfTaking?.message}</p>

            <label>יצרן</label>
            <input className="formT"{...register("manufacturer")} />
            <p>{errors.manufacturer?.message}</p>

            <input type="submit" />
        </form>
    );
}




export default AddVaccination
