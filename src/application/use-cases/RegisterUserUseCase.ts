import { IUserRepository } from '../../domain/ports/IUserRepository.js';
import { UserEntity, UserRole } from '../../domain/entities/User.js';

export interface RegisterUserCommand {
  id?: string;
  email: string;
  displayName: string;
  role: UserRole;
  teamId: string;
  teamName: string;
  position?: string;
  mainAgentOrHero?: string;
}

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(command: RegisterUserCommand): Promise<UserEntity> {
    const existing = await this.userRepository.findByEmail(command.email);
    if (existing) {
      throw new Error('El usuario ya se encuentra registrado con este correo electrónico.');
    }

    const newUser: UserEntity = {
      id: command.id || `usr-${Date.now()}`,
      email: command.email,
      displayName: command.displayName,
      role: command.role,
      teamId: command.teamId,
      teamName: command.teamName,
      position: command.position || 'Flex Specialist',
      stats: {
        kda: '0.00',
        winrate: 0,
        matchesPlayed: 0,
        hsPercentage: 0,
        mvpCount: 0,
        mainAgentOrHero: command.mainAgentOrHero || 'Flex',
      },
      createdAt: new Date().toISOString(),
    };

    return this.userRepository.save(newUser);
  }
}
