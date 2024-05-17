//Pudimos haber creado una carpeta llamada services, esto para separar y no tener el send aqui en el controlador y no
//en el service, para mas info irnos al video https://www.youtube.com/watch?v=qFmwRriNJWs minuto 23:50 o la pagina de freecodecamp
//https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/#accept-and-respond-with-data-in-json-format
import {getAllWorkout, createNewWorkoutDB, getOneWorkoutDB} from '../database/Workout.js';
import {randomUUID} from 'node:crypto'

const getAllWorkouts = (req, res) => {
    const allWorkouts = getAllWorkout();
    res.send({status: "Ok", data: allWorkouts});
};
  
const getOneWorkout = (req, res) => {
    const {workoutId} = req.params;
    console.log(workoutId);
    if(!workoutId){
        res.status(400).send("No workout found");
        return
    }
    const oneWorkout = getOneWorkoutDB(workoutId);
    res.send("Get an existing workout");
};
  
const createNewWorkout = (req, res) => {
    const {name, mode, equipment, exercises, trainerTips} = req.body;
    console.log(name);
    if (!name || !mode || !equipment || !exercises || !trainerTips){
        res.status(400).send("One field is empty");
        return;
    }

    console.log('Pasaste');
    const newWorkout = {
        name: name,
        mode: mode,
        equipment: equipment,
        exercises: exercises,
        trainerTips: trainerTips,
        id: randomUUID(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

  const createdWorkout = createNewWorkoutDB(newWorkout);
    res.status(201).send({msg: createdWorkout});
};
  
const updateOneWorkout = (req, res) => {
    res.send("Update an existing workout");
};
  
const deleteOneWorkout = (req, res) => {
    res.send("Delete an existing workout");
};

export {
    getAllWorkouts, 
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}