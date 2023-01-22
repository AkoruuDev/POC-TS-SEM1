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

export async function getRaces (_req: Request, res: Response) {
    try {
        const list: List = await db.query(`SELECT races.*, habilities.hab_list FROM races JOIN hab_list WHERE races.id = hab_list.race_id;`);
        return res.status(200).send(list);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function postRace (req: Request, res: Response) {
    const { name, cientific, description, habilities, atk, def } = req.body as List;
    await db.query(`INSERT INTO races ( name, cientific, description, atk, def ) VALUES ($1, $2, $3, $4, $5);`, [ name, cientific, description, atk, def ]);
    const race: { id: number } = await db.query(`SELECT id FROM races DESC;`);
    habilities.forEach (async e => {
        await db.query(`INSERT INTO hab_list (habilities, race) VALUES ($1, $2);`, [habilities[e], race.id[0]] );
    });
    return res.status(200).send("Race created successfully")
};

export async function deleteRace (req: Request, res: Response) {
    const { id } = req.params;
    try {
        await db.query(`DELETE races WHERE id = $1;`, [id]);
        await db.query(`DELETE habilities WHERE race_id = $1;`, [id]);
        return res.status(200).send("Race deleted successfully");
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function updateRace (req: Request, res: Response) {
    const { id } = req.params;
    const { name, cientific, description, habilities, atk, def } = req.body as List;
    const update = [ `${name}`, `${cientific}`, `${description}`, `${atk}`, `${def}` ];
    const element = [ "name", "cientific", "description", "atk", "def" ]
    try {
        update.forEach(async (e, i) => {
            if(e) {
                await db.query(`UPDATE races SET $1 = $2 WHERE id = $2;`, [element[i], update[e], id]);
            }
        });
        habilities.forEach(async e => {
            await db.query(`INSERT INTO hab_races VALUES ($1);`, [e]);
        });
        return res.status(200).send("Race updated successfully")
    } catch (err) {
        return res.status(500).send(err.message)
    }
}