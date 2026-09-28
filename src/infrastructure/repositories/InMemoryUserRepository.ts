import { IUserRepository } from '../../domain/ports/IUserRepository.js';
import { UserEntity } from '../../domain/entities/User.js';

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, UserEntity> = new Map();

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    for (const user of this.users.values()) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    this.users.set(user.id, user);
    return user;
  }

  async update(id: string, partial: Partial<UserEntity>): Promise<UserEntity> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('Usuario no encontrado para actualizar.');
    }
    const updated = { ...existing, ...partial };
    this.users.set(id, updated);
    return updated;
  }
}
