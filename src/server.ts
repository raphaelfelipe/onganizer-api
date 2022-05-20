import app from "./app";
// import { AppDataSource } from "./data-source";

(async () => {
  /* await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source Initialization", err);
  }); */

  const PORT = process.env.PORT || 3000;

  app.listen(process.env.PORT || 3000);
})();
