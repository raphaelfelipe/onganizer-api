import express from "express";

const app = express();

app.use(express.json());

//app.use(importar e colocar a rota);

app.listen(3000);
