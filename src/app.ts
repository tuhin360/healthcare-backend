import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "PH Healthcare server is running" });
});

export default app;
