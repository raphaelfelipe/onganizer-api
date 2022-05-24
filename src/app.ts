import { AppError } from "./errors/appError";
import express, { NextFunction, Request, Response } from "express";
import postRoutes from "./routes/posts.routes";
import projectRoutes from "./routes/project.routes";
import usersRoutes from "./routes/user.routes";
import donationRoutes from "./routes/donations.routes";

const app = express();

app.use(express.json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.use("/users", usersRoutes);
app.use("/posts", postRoutes);
app.use("/project", projectRoutes);
app.use("/donations", donationRoutes);

export default app;
