import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Game } from "../entity/Game";

export class GameService {
  private gameRepository: Repository<Game>;

  constructor() {
    this.gameRepository = AppDataSource.getRepository(Game);
  }

  async create(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  async delete(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async update(id: number, game: Partial<Game>): Promise<void> {
    await this.gameRepository.update(id, game);
  }

  async findById(id: number): Promise<Game | null> {
    return this.gameRepository.findOneBy({ id });
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }
}
