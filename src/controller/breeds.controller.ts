import { Request, Response } from "express";
import { db } from "../database/database";

type List = {
    id?: number,
    name?: string,
    cientific?: string,
    description?: string,
    habilities?: string[],
    atk?: number,
    def?: number
}

export async function getBreeds (_req: Request, res: Response) {
    try {
        const list: List = await db.query(`SELECT breeds.*, habilities.hab_breeds FROM breeds JOIN hab_breeds WHERE breeds.id = hab_breeds.breed_id;`);
        return res.status(200).send(list);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function postBreed (req: Request, res: Response) {
    const { name, cientific, description, habilities, atk, def } = req.body as List;
    await db.query(`INSERT INTO breeds ( name, cientific, description, atk, def ) VALUES ($1, $2, $3, $4, $5);`, [ name, cientific, description, atk, def ]);
    const breed: { id: number } = await db.query(`SELECT id FROM breeds DESC;`);
    habilities.forEach (async e => {
        await db.query(`INSERT INTO hab_breeds (habilities, breed_id) VALUES ($1, $2);`, [habilities[e], breed.id[0]] );
    });
    return res.status(200).send("breed created successfully")
};

export async function deleteBreed (req: Request, res: Response) {
    const { id } = req.params;
    try {
        await db.query(`DELETE breeds WHERE id = $1;`, [id]);
        await db.query(`DELETE habilities WHERE breed_id = $1;`, [id]);
        return res.status(200).send("breed deleted successfully");
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function updateBreed (req: Request, res: Response) {
    const { id } = req.params;
    const { name, cientific, description, habilities, atk, def } = req.body as List;
    const update = [ `${name}`, `${cientific}`, `${description}`, `${atk}`, `${def}` ];
    const element = [ "name", "cientific", "description", "atk", "def" ]
    try {
        update.forEach(async (e, i) => {
            if(e) {
                await db.query(`UPDATE breeds SET $1 = $2 WHERE id = $2;`, [element[i], update[e], id]);
            }
        });
        habilities.forEach(async e => {
            await db.query(`INSERT INTO hab_breeds VALUES ($1);`, [e]);
        });
        return res.status(200).send("breed updated successfully")
    } catch (err) {
        return res.status(500).send(err.message)
    }
}