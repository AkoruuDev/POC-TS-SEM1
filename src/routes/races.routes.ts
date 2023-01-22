import { Request, Response, Router } from "express";
import { deleteRace, getRaces, postRace, updateRace } from "../controller/races.controller";

const route = Router();

route
    .get('/confer', (_req: Request, res: Response) => {
        res.send('Races route OK');
    })
    .get('/races', getRaces)
    .post('/race', postRace)
    .delete('/race/:id', deleteRace)
    .put('/race/:id', updateRace);

export default route;