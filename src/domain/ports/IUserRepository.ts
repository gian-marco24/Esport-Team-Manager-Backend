import { UserEntity } from '../entities/User.js';

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
}
