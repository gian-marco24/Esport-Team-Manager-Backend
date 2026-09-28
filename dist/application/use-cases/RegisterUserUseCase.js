export class RegisterUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        const existing = await this.userRepository.findByEmail(command.email);
        if (existing) {
            throw new Error('El usuario ya se encuentra registrado con este correo electrónico.');
        }
        const newUser = {
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
//# sourceMappingURL=RegisterUserUseCase.js.map