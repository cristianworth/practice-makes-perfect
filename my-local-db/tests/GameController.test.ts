import request from "supertest";
import { AppDataSource } from "../src/data-source";
import { Game } from "../src/entity/Game";
import express from "express";
import { GameController } from "../src/controller/GameController";

const app = express();
app.use(express.json());

const gameController = new GameController();
app.post("/games", gameController.create);
app.delete("/games/:id", gameController.delete);
app.put("/games/:id", gameController.update);
app.get("/games/:id", gameController.findById);
app.get("/games", gameController.findAll);

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("GameController", () => {
  let createdGameId: number;

  it("should create a new game", async () => {
    const response = await request(app).post("/games").send({
      description: "Test Game",
      abbreviation: "TG",
      img: "path/to/img.png",
      capStamina: 100,
      staminaPerMinute: 1,
      currentStamina: 50,
      maxStaminaAt: 100,
      dateMaxStamina: new Date(),
      pendingTasks: "Task 1, Task 2",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdGameId = response.body.id;
  });

  it("should get all games", async () => {
    const response = await request(app).get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a game by id", async () => {
    const response = await request(app).get(`/games/${createdGameId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdGameId);
  });

  it("should update a game by id", async () => {
    const updateData = {
      description: "Updated Test Game",
    };
    const response = await request(app).put(`/games/${createdGameId}`).send(updateData);

    expect(response.status).toBe(200);

    const updatedGameResponse = await request(app).get(`/games/${createdGameId}`);
    expect(updatedGameResponse.body).toHaveProperty("description", updateData.description);
  });

  it("should delete a game by id", async () => {
    const response = await request(app).delete(`/games/${createdGameId}`);

    expect(response.status).toBe(204);

    const deletedGameResponse = await request(app).get(`/games/${createdGameId}`);
    expect(deletedGameResponse.status).toBe(404);
  });
});
