// import DB from './db.json';
//Primera forma de importar JSON
// import fs from 'fs';
// const workoutDB = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'));
//Segunda forma
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const workoutDB = require('./db.json'); //Import database, we did this to avoid error
// //needs an import assertion of type "json"
const getAllWorkout = () => {
    return workoutDB.workouts;
}

export {getAllWorkout};