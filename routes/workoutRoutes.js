import express from "express";
import {getAllWorkouts, 
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout} from '../controller/workoutController.js'
const router = express.Router();

router.route('/').get(getAllWorkouts).post(createNewWorkout);
router.route('/:workoutId').get(getOneWorkout).patch(updateOneWorkout).delete(deleteOneWorkout)
    
export default router;