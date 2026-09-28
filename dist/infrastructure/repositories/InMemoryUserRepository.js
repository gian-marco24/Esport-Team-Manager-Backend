export class InMemoryUserRepository {
    users = new Map();
    async findById(id) {
        return this.users.get(id) || null;
    }
    async findByEmail(email) {
        for (const user of this.users.values()) {
            if (user.email.toLowerCase() === email.toLowerCase()) {
                return user;
            }
        }
        return null;
    }
    async save(user) {
        this.users.set(user.id, user);
        return user;
    }
    async update(id, partial) {
        const existing = await this.findById(id);
        if (!existing) {
            throw new Error('Usuario no encontrado para actualizar.');
        }
        const updated = { ...existing, ...partial };
        this.users.set(id, updated);
        return updated;
    }
}
//# sourceMappingURL=InMemoryUserRepository.js.map