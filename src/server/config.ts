export const configSER = {
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: 5432,
    DB_SCHEMA: 'next-postgraphile',
}

export const configDEV = {
    DB_HOST: process.env.DB_HOST_DEV,
    DB_DATABASE: process.env.DB_DATABASE_DEV,
    DB_USER: process.env.DB_USER_DEV,
    DB_PASSWORD: process.env.DB_PASSWORD_DEV,
    DB_PORT: 5432,
    DB_SCHEMA: 'next-postgraphile',
}