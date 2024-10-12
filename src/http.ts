import { Express,Request,Response } from "express";
import express from "express";
import data from "./NithAlumni";

export function initHttp(app: Express) {
    app.use(express.json());
    app.get("/test", (req, res) => {
        res.json(data);
    });
    app.post("/ran", (req: Request, res: Response) => {
        const excludeIndexes: number[] = req.body.indexes || [];
        
        // Filter out the excluded indexes
        const availableData = data.filter((_, index) => !excludeIndexes.includes(index));

        // Shuffle the available data
        const shuffled = [...availableData].sort(() => 0.5 - Math.random());

        // Get the first 10 items (or less if there are fewer than 10 available)
        const randomItems = shuffled.slice(0, 10);

        res.json(randomItems);
    });
}