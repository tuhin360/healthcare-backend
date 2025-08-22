import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();
app.use(cors());

// parser : JSON এবং URL-encoded ডাটা পার্স করার মিডলওয়্যার যোগ করা
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "PH Healthcare server is running" });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

export default app;
