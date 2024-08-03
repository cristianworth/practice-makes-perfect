import { Request, Response } from "express";
import { GameService } from "../service/GameService";

export class GameController {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  create = async (req: Request, res: Response) => {
    const game = req.body;
    const newGame = await this.gameService.create(game);
    res.status(201).json(newGame);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.gameService.delete(Number(id));
    res.status(204).send();
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const game = req.body;
    await this.gameService.update(Number(id), game);
    res.status(200).send();
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const game = await this.gameService.findById(Number(id));
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).send();
    }
  };

  findAll = async (_: Request, res: Response) => {
    const games = await this.gameService.findAll();
    res.status(200).json(games);
  };
}
