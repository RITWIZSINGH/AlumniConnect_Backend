import { Express } from "express";
import express from "express";
import data from "./NithAlumni";

export function initHttp(app: Express) {
    app.use(express.json());
    app.get("/test", (req, res) => {
        res.json(data);
    });
   
}