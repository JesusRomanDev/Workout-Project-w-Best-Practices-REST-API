import { getRecordForWorkoutDB } from "../database/Record.js";

const getRecordForWorkout = (req, res) => {
    const {workoutID} = req.params;
    console.log(workoutID);
    if(!workoutID) throw ({status: 400, msg: 'No Workout ID was given'});

    try {
        const getOneRecord = getRecordForWorkoutDB(workoutID);
        res.status(200).send(getOneRecord)
    } catch (error) {
        res.status(e.status || 400).send(e.msg);
    }
}

export {getRecordForWorkout};