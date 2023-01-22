import { Request, Response, Router } from "express";
import { deleteBreed, getBreeds, postBreed, updateBreed } from "../controller/breeds.controller";

const route = Router();

route
    .get('/confer', (_req: Request, res: Response) => {
        res.send('Breeds route OK');
    })
    .get('/breeds', getBreeds)
    .post('/breed', postBreed)
    .delete('/breed/:id', deleteBreed)
    .put('/breed/:id', updateBreed);

export default route;