import express from "express";
import cors from 'cors';
import userRouter from "./routers/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/student", userRouter);

const port = 3000;
app.listen(port, ()=> console.log(`server listening on port ${port}`));