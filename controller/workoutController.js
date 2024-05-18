//Pudimos haber creado una carpeta llamada services, esto para separar y no tener el send aqui en el controlador y no
//en el service, para mas info irnos al video https://www.youtube.com/watch?v=qFmwRriNJWs minuto 23:50 o la pagina de freecodecamp
//https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/#accept-and-respond-with-data-in-json-format
import {getAllWorkout, createNewWorkoutDB, getOneWorkoutDB, updateOneWorkoutDB, deleteWorkoutDB} from '../database/Workout.js';
import {randomUUID} from 'node:crypto'

const getAllWorkouts = (req, res) => {
    const allWorkouts = getAllWorkout();
    res.send({status: "Ok", data: allWorkouts});
};
  
const getOneWorkout = (req, res) => {
    const {workoutId} = req.params;
    console.log(workoutId);
    if(!workoutId){
        res.status(400).send("Please provide a workout id");
        return
    }
    const oneWorkout = getOneWorkoutDB(workoutId);
    console.log(oneWorkout);
    res.status(oneWorkout[0]).send({msg: oneWorkout[1]});
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
    const {workoutId} = req.params;
    const {body} = req;
    console.log(workoutId);
    console.log(body);
    if(!workoutId){
        res.status(400).send({msg: "Workout not found"})
    }
    const updatedWorkout = updateOneWorkoutDB(workoutId, body);
    res.status(updatedWorkout[0]).send({msg: updatedWorkout[1]});
};
  
const deleteOneWorkout = (req, res) => {
    const {workoutId} = req.params;
    if(!workoutId){
        res.status(200).send("Need Workout ID")
    }
    const deletedWorkout = deleteWorkoutDB(workoutId);
    res.send("Delete an existing workout");
};

export {
    getAllWorkouts, 
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}