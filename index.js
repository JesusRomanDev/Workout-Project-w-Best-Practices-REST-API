import express from "express";
import appRouter from './routes/workoutRoutes.js';
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/workouts', appRouter); //Name Resources in Plural for our endpoint

app.listen(PORT, () =>{
    console.log(`Escuchando desde el puerto ${PORT}`);
}); 