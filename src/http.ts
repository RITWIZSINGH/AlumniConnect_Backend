import { Express, Request, Response } from "express";
import express from "express";
import data from "./NithAlumni";
import { Student } from "./db/schema";
import { Students } from "./types";
import nodemailer from "nodemailer";
import { sendMail } from "./smtp/mail";

export function initHttp(app: Express) {
    app.use(express.json());
    const transporter = nodemailer.createTransport({
        service: "Gmail", // Use your email service provider
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.PASSWORD, // Your email password or app password
        },
    });
    app.get("/test", (req: Request, res: Response) => {
        res.json(data);
    });

    app.post("/sendmail", async(req: Request, res: Response) => {
        const {userMail,alumniMail}=req.body;
        console.log(req.body);
        const Data:any= await Student.find({ Email: userMail });
        console.log(Data);
        const studentData:Students=Data[0];
        const mailOptions = sendMail(alumniMail,studentData,userMail);
    
        try {
            await transporter.sendMail(mailOptions);
            res.json({ success: true, message: "Email sent successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to send email. Please try again later." });
        }

    });

    app.post("/addStudent", (req: Request, res: Response) => {
        const { RollNo, Name, Branch, Batch, Resume, Email, LinkedIn } = req.body;
        console.log(req.body);
        if (!RollNo || !Name || !Branch || !Batch || !Resume || !Email) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const newStudent= new Student({ RollNo, Name, Branch, Batch, Resume, Email, LinkedIn });
        newStudent.save().then(() => {
            res.json({ success: true });
        }).catch(err => {
            res.status(500).json({ error: err.message });
        });
    });
    app.get("/studentData", async (req: Request, res: Response) => {
        const query = (req.query.email as string || "").toLowerCase();
        const studentData= await Student.find({Email: query});
        res.json({ items: studentData });
    });
    app.get("/search", (req: Request, res: Response) => {
        const query = (req.query.q as string || "").toLowerCase();

        const matchingItems = data.filter(item => {
            
            return Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(query)
            );
        });

        res.json({ items: matchingItems });
    });
    app.post("/filter", (req: Request, res: Response) => {
        console.log(req.body);
        const matchingItems = data.filter(item => {
            const matchField = req.body.field.length === 0 || req.body.field.includes(item.FIELD);
            const matchesBranch = req.body.branch.length === 0 || req.body.branch.includes(item.BRANCH);
            const matchesBatch = req.body.batch.length === 0 || req.body.batch.includes(item.BATCH);
           
            return matchesBranch && matchesBatch&& matchField;
        });
    
        res.json({ items: matchingItems });
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