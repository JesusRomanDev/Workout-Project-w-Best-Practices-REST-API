//Pudimos haber creado una carpeta llamada services, esto para separar y no tener el send aqui en el controlador y no
//en el service, para mas info irnos al video https://www.youtube.com/watch?v=qFmwRriNJWs minuto 23:50 o la pagina de freecodecamp
//https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/#accept-and-respond-with-data-in-json-format
import {getAllWorkout, createNewWorkoutDB, getOneWorkoutDB, updateOneWorkoutDB, deleteWorkoutDB} from '../database/Workout.js';
import {randomUUID} from 'node:crypto'

const getAllWorkouts = (req, res) => {
    // res.setHeader('Content-Type', 'application/xml').send({msg: "HOLA"})
    // res.send('<p>Hola puto</p>')
    // return;
    //Query params
    const {mode, length, equipment, sort} = req.query;
    // console.log(equipment);
    //You can try it further with adding "for%20time" as the value for the "mode" parameter (remember --> "%20" means "whitespace")
    //d and you should receive all workouts that have the mode "For Time" if there are any stored.
    try {
        const allWorkouts = getAllWorkout({mode, length, equipment, sort});
        res.send({status: "Ok", data: allWorkouts});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
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
    console.log(req.body);
    if (!name || !mode || !equipment || !exercises || !trainerTips){
        res.status(400).send({status: "Failed", data: { error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips' "}});
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

    try {
        const createdWorkout = createNewWorkoutDB(newWorkout);
        res.status(201).send({msg: createdWorkout});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: 'FAILED', data: {error: error?.message || error}})
    }

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