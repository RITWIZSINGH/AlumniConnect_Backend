import dotenv from "dotenv"
dotenv.config()
import express from "express";
import { createServer } from "http";
import { initHttp } from "./http";
import cors from "cors";


const app = express();
app.use(cors());
const httpServer = createServer(app);
initHttp(app);

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});