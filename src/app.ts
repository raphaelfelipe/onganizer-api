import express from "express";
import postRoutes from "./routes/posts.routes";
import projectRoutes from "./routes/project.routes";
import usersRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postRoutes)
app.use("/project", projectRoutes)

export default app;
