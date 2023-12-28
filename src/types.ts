export type Bindings = {
    DB: D1Database;
    KV: KVNamespace;
    RESEND_API_KEY: string;
    JWT_SECRET_KEY: string;
};

export type JWTPayload = {
    role: "admin" | "user";
    userUuid: string;
    email: string;
};
