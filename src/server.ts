import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
const server = express();
server.use(express.json());
server.use(cors);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});