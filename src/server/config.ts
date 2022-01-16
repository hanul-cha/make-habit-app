export const configSER = {
    DB_HOST: process.env.NEXT_PUBLIC_DB_HOST,
    DB_DATABASE: process.env.NEXT_PUBLIC_DB_DATABASE,
    DB_USER: process.env.NEXT_PUBLIC_DB_USER,
    DB_PASSWORD: process.env.NEXT_PUBLIC_DB_PASSWORD,
    DB_PORT: 5432,
    DB_SCHEMA: 'next-postgraphile',
}

export const configDEV = {
    DB_HOST: process.env.NEXT_PUBLIC_DB_HOST_DEV,
    DB_DATABASE: process.env.NEXT_PUBLIC_DB_DATABASE_DEV,
    DB_USER: process.env.NEXT_PUBLIC_DB_USER_DEV,
    DB_PASSWORD: process.env.NEXT_PUBLIC_DB_PASSWORD_DEV,
    DB_PORT: 5432,
    DB_SCHEMA: 'next-postgraphile',
}