import { getRecordForWorkoutDB } from "../database/Record.js";

const getRecordForWorkout = (req, res) => {
    const {workoutID} = req.params;
    console.log(workoutID);
    console.log(req.headers);
    console.log(req.params);
    if(!workoutID) throw ({status: 400, msg: 'No Workout ID was given'});

    try {
        const getOneRecord = getRecordForWorkoutDB(workoutID);
        res.status(200).send(getOneRecord)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).send(error.message);
    }
}

export {getRecordForWorkout};