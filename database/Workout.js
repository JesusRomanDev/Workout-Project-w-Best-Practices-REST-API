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

const createNewWorkoutDB = (workout) => {
    //Si retorna menos 1 es que no lo encontro
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        return;
    }

    workoutDB.workouts.push(workout);
    console.log(workout);
    saveToDatabase(workoutDB);
    return workout;
}

export {getAllWorkout, createNewWorkoutDB};