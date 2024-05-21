// import DB from './db.json';
//Primera forma de importar JSON
// import fs from 'fs';
// const workoutDB = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'));
//Segunda forma
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const workoutDB = require('./db.json'); //Import database, we did this to avoid error
// //needs an import assertion of type "json"
import { saveToDatabase } from './utils.js';

const getAllWorkout = (filterParams) => {
    //Adding a variable to make it cleaner
    const workouts = workoutDB.workouts;
    //Si especifican un mode
    if(filterParams.mode){
        return workouts.filter(el => {
            return el.mode.toLowerCase().includes(filterParams.mode)
        })
    }

    //Retornando el lenght
    if(filterParams.length){
        return workouts.slice(0, parseInt(filterParams.length))
    }
    
    //Esta anidado por eso usamos 2 metodos de array
    if(filterParams.equipment){
        return workouts.filter(el => Object.entries(el.equipment).some(([key, value]) => value === filterParams.equipment))
    }

    //Sort the workouts in response in descending order by their creatin date
    //Plus if contains lenght
    if(filterParams.sort){
        if(filterParams.sort && filterParams.length) return workouts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, parseInt(filterParams.length));
        return workouts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    //Si no lo hubieramos pasado como objeto en el controller
    // if(!filterParams){
    //     console.log('aqui');
    // }
    return workouts;
}

const getOneWorkoutDB = (workoutId) => {
    const workoutFiltered = workoutDB.workouts.filter((workout) => workout.id === workoutId)
    if(workoutFiltered.length === 0){
        const err = [400, "This workout doesn't exist"]
        return err;
    }
    const success = [200, workoutFiltered]
    return success;
}

const createNewWorkoutDB = (newWorkout) => {
    //Si retorna menos 1 es que no lo encontro
    console.log(newWorkout);
    const isAlreadyAdded = workoutDB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        throw({status:200, message: `Workout with the name ${newWorkout.name} already exists`})
        // return; //comentamos el return porque en el THROW se detiene la ejecucion del codigo en ese punto y el return se
        //ignora, no tiene sentido dejar ese RETURN;
    }
    //Añadiendo un try-catch
    //Aqui lo pusheamos en memoria, pero aun falta en la DB
    try {
        workoutDB.workouts.push(newWorkout);
        console.log(newWorkout);
        //Aqui guardamos en la DB
        saveToDatabase(workoutDB);
        return newWorkout;
    } catch (error) {
        throw ({status:500, message: error?.message || error});
    }
}

const updateOneWorkoutDB = (workoutId, updatedWorkout) => {
    const idExists = workoutDB.workouts.findIndex((workout) => workout.id === workoutId) > -1;
    if(!idExists){
        const err = [400, "This workout doesn't exist"]
        return err;
    }

    const indexForUpdate = workoutDB.workouts.findIndex(el => el.id === workoutId)
    console.log(indexForUpdate);
    const workoutUpdated = {
        ...workoutDB.workouts[indexForUpdate],
        ...updatedWorkout,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
    }
    // console.log(workoutUpdated);
    //Vaciando la DB original, porque si no, tendriamos la DB original y abajo PUSHEAREMOS LA NUEVA, entonces tendremos
    //DB repetidas por asi decirlo
    // workoutDB.workout = 0;
    //Pusheando la nueva DB 
    // workoutDB.workouts.push(newDB);
    workoutDB.workouts[indexForUpdate] = workoutUpdated;
    saveToDatabase(workoutDB);
    const success = [200, workoutUpdated];
    return success;
}

const deleteWorkoutDB = (workoutId) => {
    const indexForDelete = workoutDB.workouts.findIndex(el => el.id === workoutId);
    workoutDB.workouts.splice(indexForDelete, 1);
    console.log(workoutDB);
    saveToDatabase(workoutDB);
}

export {getAllWorkout, createNewWorkoutDB, getOneWorkoutDB, updateOneWorkoutDB, deleteWorkoutDB};