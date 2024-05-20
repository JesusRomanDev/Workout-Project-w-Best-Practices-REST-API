import express from "express";
import {getAllWorkouts, 
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout} from '../controller/workoutController.js'
const router = express.Router();

router.route('/').get(getAllWorkouts).post(createNewWorkout);
router.route('/:workoutId').get(getOneWorkout).patch(updateOneWorkout).delete(deleteOneWorkout)

// Current implementations (without verbs)
// GET "/api/v1/workouts" 
// GET "/api/v1/workouts/:workoutId" 
// POST "/api/v1/workouts" 
// PATCH "/api/v1/workouts/:workoutId" 
// DELETE "/api/v1/workouts/:workoutId"  

// // Implementation using verbs 
// GET "/api/v1/getAllWorkouts" 
// GET "/api/v1/getWorkoutById/:workoutId" 
// CREATE "/api/v1/createWorkout" 
// PATCH "/api/v1/updateWorkout/:workoutId" 
// DELETE "/api/v1/deleteWorkout/:workoutId"

//Another reason I'd like to point out for not using verbs inside your URL is that the HTTP verb itself already indicates the action.
//Things like "GET /api/v1/getAllWorkouts" or "DELETE api/v1/deleteWorkout/workoutId" are unnecessary.

export default router;