import { Inject, Injectable } from '@nestjs/common';
import { MoreThan, Not, Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionService {

  constructor(
    @Inject('SESSION_REPOSITORY') private repository: Repository<Session>,
  ) {
  }

  createSession(session: Session) {
    return this.repository.save(session);
  }


  async findById(sessionId: string) {
    return this.repository.findOne({
      where: {
        sessionId
      }
    });
  }

  async findActiveSessionByUserId(userId: number) {

    const [sessions, count] = await this.repository.findAndCount({
      where: {
        userId,
        expiresAt: MoreThan(new Date()),
        isInvalid: false,
      },
    });

    return {sessions, count}
  }

  invalidateAllExcept(userId: number, sessionId: string) {

    return this.repository.createQueryBuilder()
      .update({
        isInvalid: true,
      })
      .where({
        userId,
        expiresAt: MoreThan(new Date()),
        isInvalid: false,
        sessionId: Not(sessionId),
      }).execute();

  }

  async invalidateSessionById(sessionId: string) {
    await this.repository.createQueryBuilder()
      .update({
        isInvalid: true,
      })
      .where({
        isInvalid: false,
        sessionId: sessionId,
      }).execute();

    return this.repository.findOne(sessionId);
  }
}
