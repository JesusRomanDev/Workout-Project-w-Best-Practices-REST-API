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
    workoutDB.workouts.filter()
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

export {getAllWorkout, createNewWorkoutDB, getOneWorkoutDB};