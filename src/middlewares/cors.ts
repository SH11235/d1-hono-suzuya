import { cors } from "hono/cors";

export const corsMiddleware = cors({
    origin: ["http://localhost:1235"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
    exposeHeaders: ["Authorization"],
    maxAge: 86400,
});
