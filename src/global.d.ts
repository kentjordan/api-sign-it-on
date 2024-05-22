export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string
            DB_NAME: string
            DB_HOSTNAME: string
            DB_PORT: string
            DB_USERNAME: string
            DB_PASSWORD: string
            DATABASE_URL: string
        }
    }
}