import { Express, Request, Response } from "express";
import express from "express";
import data from "./NithAlumni";

export function initHttp(app: Express) {
    app.use(express.json());

    app.get("/test", (req: Request, res: Response) => {
        res.json(data);
    });

    app.post("/ran", (req: Request, res: Response) => {
        const excludeIndexes: number[] = req.body.indexes || [];
        const maxToReturn: number = 10;
        
        // Create an array of available indexes
        const availableIndexes = data.reduce((acc, _, index) => {
            if (!excludeIndexes.includes(index)) {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);

        // Shuffle the available indexes
        const shuffledIndexes = [...availableIndexes].sort(() => 0.5 - Math.random());

        // Get up to 10 indexes, or all remaining if less than 10
        const selectedIndexes = shuffledIndexes.slice(0, Math.min(maxToReturn, shuffledIndexes.length));

        // Get the items corresponding to the selected indexes
        const selectedItems = selectedIndexes.map(index => data[index]);

        res.json({
            items: selectedItems,
            indexes: selectedIndexes,
            remaining: availableIndexes.length - selectedIndexes.length
        });
    });
}