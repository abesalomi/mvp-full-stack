import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            return await createConnection({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT ? parseInt(process.env.DB_PORT ) : 5432,
                database: process.env.DB_DATABASE || 'task',
                username: process.env.DB_USERNAME || 'task',
                password: process.env.DB_PASSWORD || 'task',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            })
        },
    },
];
