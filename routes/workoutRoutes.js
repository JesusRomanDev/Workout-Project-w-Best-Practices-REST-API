import express from "express";
//Use data caching for performance improvements USING APICACHE PACKAGE
import apicache from 'apicache';
import {getAllWorkouts, 
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout} from '../controller/workoutController.js'
import { getRecordForWorkout } from "../controller/recordController.js";
const router = express.Router();
//Using apicache
const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
*/
//cache vas used as a parameter in our router, after the patch ('/') and before our controller
router.route('/', cache("2 minutes")).get(getAllWorkouts).post(createNewWorkout);
router.route('/:workoutId').get(getOneWorkout).patch(updateOneWorkout).delete(deleteOneWorkout)

//Logical Nesting
//We have a dynamic ID then another endpoint
//workouts and records on db.json are related, on records the workout property is the id of workouts so they are related
//So for a certain workout ID there will be a record w all the info(time, member, etc...)
//Records
router.route('/:workoutID/records').get(getRecordForWorkout);

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