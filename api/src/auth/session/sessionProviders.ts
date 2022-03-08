import { Connection } from 'typeorm';
import { Session } from './session.entity';

export const sessionProviders = [
  {
    provide: 'SESSION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Session),
    inject: ['DATABASE_CONNECTION'],
  },
];
