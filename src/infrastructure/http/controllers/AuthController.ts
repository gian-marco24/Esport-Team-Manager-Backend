import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase.js';
import { InMemoryUserRepository } from '../../repositories/InMemoryUserRepository.js';

const userRepository = new InMemoryUserRepository();
const registerUseCase = new RegisterUserUseCase(userRepository);

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await registerUseCase.execute(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      res.status(400).json({ success: false, message });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      const user = await userRepository.findById(id);
      if (!user) {
        res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        return;
      }
      res.json({ success: true, data: user });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({ success: false, message });
    }
  }
}
