export const config = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_DATABASE: process.env.DB_DATABASE || 'make_habit_app',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '111111',
    DB_PORT: 5432,
    DB_SCHEMA: 'next-postgraphile',
}