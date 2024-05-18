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

const getAllWorkout = () => {
    return workoutDB.workouts;
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
        console.log('Ya se añadio');
        return;
    }
    //Aqui lo pusheamos en memoria, pero aun falta en la DB
    workoutDB.workouts.push(newWorkout);
    console.log(newWorkout);
    //Aqui guardamos en la DB
    saveToDatabase(workoutDB);
    return newWorkout;
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