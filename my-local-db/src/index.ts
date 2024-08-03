import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import { GameController } from "./controller/GameController";

const app = express();
const port = 3000;

app.use(express.json());

const gameController = new GameController();

app.post("/games", gameController.create);
app.delete("/games/:id", gameController.delete);
app.put("/games/:id", gameController.update);
app.get("/games/:id", gameController.findById);
app.get("/games", gameController.findAll);

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(error => console.log(error));
