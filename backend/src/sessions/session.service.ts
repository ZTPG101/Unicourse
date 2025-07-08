import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/database/entities/session.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async create(user: User, hashedRefreshToken: string, deviceInfo?: string) {
    const session = this.sessionRepo.create({
      user,
      hashedRefreshToken,
      deviceInfo,
    });
    return this.sessionRepo.save(session);
  }

  async findByToken(hashedRefreshToken: string) {
    return this.sessionRepo.findOne({
      where: { hashedRefreshToken },
      relations: ['user'],
    });
  }

  async removeSession(id: number) {
    return this.sessionRepo.delete(id);
  }

  async removeAllSessionsForUser(userId: number) {
    return this.sessionRepo.delete({ user: { id: userId } });
  }

  async findSessionsByUser(userId: number) {
    return this.sessionRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateSession(session: Session) {
    return this.sessionRepo.save(session);
  }
}
