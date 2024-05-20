import express from "express";
import appRouter from './routes/workoutRoutes.js';
const app = express();

const PORT = process.env.PORT || 3000;
//Adding Body Parser before routes/endpoints
app.use(express.json());

//workouts it's our resource name
app.use('/api/workouts', appRouter); //Name Resources in Plural for our endpoint
//Avoid verbs in endpoint names
//GET "/api/v1/getAllWorkouts" 
//See routes file for more info

app.listen(PORT, () =>{
    console.log(`Escuchando desde el puerto ${PORT}`);
}); 